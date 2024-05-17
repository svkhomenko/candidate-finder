import { Heading, Text, Flex } from '@chakra-ui/react';
import { useParams } from 'react-router-dom';
import { useGetVacancyLanguageLevelsQuery } from '~/store/api/vacancy-slice';
import PageAlert from '~/components/PageAlert';
import Loader from '~/components/Loader';
import IError from '~/types/error';
import VacancyLanguage from './VacancyLanguage';
import VacancyLanguageCreate from './VacancyLanguageCreate';

type IProps = {
  isCurUser: boolean;
};

const VacancyLanguages = ({ isCurUser }: IProps) => {
  const { id: vacancyId } = useParams();
  const { data: languagesLevels, isLoading, error } = useGetVacancyLanguageLevelsQuery(Number(vacancyId));

  if (error) {
    return <PageAlert status="error" message={(error as IError).data.message} />;
  }

  if (isLoading) {
    return <Loader />;
  }

  if (!languagesLevels) {
    return <PageAlert status="error" message={'Помилка при отриманні мов з вакансії'} />;
  }

  return (
    <>
      <Flex flexDir="row">
        <Heading size="md" marginTop="10px" flexGrow="1">
          Перелік мов
        </Heading>
        {isCurUser && <VacancyLanguageCreate />}
      </Flex>

      {languagesLevels.length === 0 ? (
        <Text>Мови не вказано</Text>
      ) : (
        languagesLevels.map((lang) => <VacancyLanguage key={lang.language} languageLevel={lang} />)
      )}
    </>
  );
};

export default VacancyLanguages;
