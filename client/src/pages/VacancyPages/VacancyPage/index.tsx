import { Card, CardHeader, CardBody, Stack, Heading, Text, Flex, Button } from '@chakra-ui/react';
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useGetVacancyQuery } from '~/store/api/vacancy-slice';
import { useAppSelector } from '~/hooks/use-app-selector';
import {
  getFormattedSalary,
  getExpirienceStr,
  educationTranslation,
  contractTranslation,
  getOnlineStr,
} from '~/components/VacancyResumeCard/helpers';
import UpdateVacancy from './UpdateVacancy';
import DeleteVacancy from './DeleteVacancy';
import VacancyLanguages from './VacancyLanguages';
import RecommendatedResumes from './RecommendatedResumes';
import VacancyResumeUser from '~/components/VacancyResumeUser';
import Layout from '~/components/Layout';
import PageAlert from '~/components/PageAlert';
import Loader from '~/components/Loader';
import { FiEdit } from 'react-icons/fi';
import IError from '~/types/error';
import styles from '../vacancy-card.styles';

const VacancyPage = () => {
  const { id: vacancyId } = useParams();
  const { user } = useAppSelector((state) => state.profile);
  const { data: vacancy, isLoading, error } = useGetVacancyQuery(Number(vacancyId));
  const [isEdit, setIsEdit] = useState(false);

  if (error) {
    return <PageAlert status="error" message={(error as IError).data.message} />;
  }

  if (isLoading) {
    return <Loader />;
  }

  if (!vacancy) {
    return <PageAlert status="error" message={'Вакансію не знайдено'} />;
  }

  return (
    <>
      {isEdit ? (
        <UpdateVacancy vacancy={vacancy} setIsEdit={setIsEdit} />
      ) : (
        <>
          <Layout>
            <Card sx={styles.card} variant="outline">
              <CardHeader paddingBottom="0">
                <Flex flexDir="row">
                  <Heading mt="4" size="lg" flexGrow="1">
                    {vacancy.title}
                  </Heading>
                  {Number(user.id) === vacancy.userId && (
                    <Flex gap="5px">
                      <Button onClick={() => setIsEdit(true)}>
                        <FiEdit />
                      </Button>
                      <DeleteVacancy />
                    </Flex>
                  )}
                </Flex>
              </CardHeader>

              <CardBody>
                <Stack spacing="3">
                  <Text color="green.800">{getFormattedSalary(vacancy.salaryMin, vacancy.salaryMax)} грн</Text>
                  <Text color="green.800">{vacancy.address}</Text>
                  <Text color="green.800">{getExpirienceStr(vacancy.experience)}</Text>
                  <Text color="green.800">{educationTranslation[vacancy.education]}</Text>
                  <Text color="green.800">{contractTranslation[vacancy.contract]}</Text>
                  <Text color="green.800">{getOnlineStr(vacancy.online)}</Text>

                  <Heading size="md" marginTop="10px">
                    Опис вакансії
                  </Heading>
                  <Text whiteSpace="pre-line">{vacancy.description}</Text>

                  <VacancyLanguages isCurUser={Number(user.id) === vacancy.userId} />

                  <VacancyResumeUser userId={vacancy.userId} />
                </Stack>
              </CardBody>
            </Card>
          </Layout>
          {Number(user.id) === vacancy.userId ? <RecommendatedResumes /> : null}
        </>
      )}
    </>
  );
};

export default VacancyPage;
