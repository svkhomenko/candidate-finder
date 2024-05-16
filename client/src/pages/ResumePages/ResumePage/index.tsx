import { Card, CardHeader, CardBody, Stack, Heading, Text, Flex, Button, Icon } from '@chakra-ui/react';
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useGetResumeQuery } from '~/store/api/resume-slice';
import { useAppSelector } from '~/hooks/use-app-selector';
import {
  getFormattedSalary,
  getExpirienceStr,
  educationTranslation,
  contractTranslation,
  getOnlineStr,
} from '~/components/VacancyResumeCard/helpers';
import UpdateResume from './UpdateResume';
import Layout from '~/components/Layout';
import PageAlert from '~/components/PageAlert';
import Loader from '~/components/Loader';
import { FiEdit } from 'react-icons/fi';
import IError from '~/types/error';
import styles from '../resume-card.styles';

const ResumePage = () => {
  const { id: resumeId } = useParams();
  const { user } = useAppSelector((state) => state.profile);
  const { data: resume, isLoading, error } = useGetResumeQuery(Number(resumeId));
  const [isEdit, setIsEdit] = useState(false);

  if (error) {
    return <PageAlert status="error" message={(error as IError).data.message} />;
  }

  if (isLoading) {
    return <Loader />;
  }

  if (!resume) {
    return <PageAlert status="error" message={'Резюме не знайдено'} />;
  }

  return (
    <>
      {isEdit ? (
        <UpdateResume resume={resume} setIsEdit={setIsEdit} />
      ) : (
        <Layout>
          <Card sx={styles.card} variant="outline">
            <CardHeader>
              <Flex flexDir="row">
                <Flex flexDir="column" flexGrow="1">
                  <Heading mt="4" size="lg">
                    {resume.title}
                  </Heading>
                </Flex>
                {Number(user.id) === resume.userId && (
                  <Flex>
                    <Button onClick={() => setIsEdit(true)} leftIcon={<Icon as={FiEdit} />}>
                      Редагувати
                    </Button>
                  </Flex>
                )}
              </Flex>
            </CardHeader>

            <CardBody>
              <Stack spacing="3">
                <Text color="green.800">{getFormattedSalary(resume.salaryMin, resume.salaryMax)} грн</Text>
                <Text color="green.800">{resume.address}</Text>
                <Text color="green.800">{getExpirienceStr(resume.experience)}</Text>
                <Text color="green.800">{educationTranslation[resume.education]}</Text>
                <Text color="green.800">{contractTranslation[resume.contract]}</Text>
                <Text color="green.800">{getOnlineStr(resume.online)}</Text>

                <Heading size="md" marginTop="10px">
                  Опис вакансії
                </Heading>
                <Text whiteSpace="pre-line">{resume.description}</Text>
              </Stack>
            </CardBody>
          </Card>
        </Layout>
      )}
    </>
  );
};

export default ResumePage;
