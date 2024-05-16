import { Heading, Text, Flex } from '@chakra-ui/react';
import { useParams } from 'react-router-dom';
import { useGetResumeLanguageLevelsQuery } from '~/store/api/resume-slice';
import PageAlert from '~/components/PageAlert';
import Loader from '~/components/Loader';
import IError from '~/types/error';
import ResumeLanguage from './ResumeLanguage';
import ResumeLanguageCreate from './ResumeLanguageCreate';

type IProps = {
  isCurUser: boolean;
};

const ResumeLanguages = ({ isCurUser }: IProps) => {
  const { id: resumeId } = useParams();
  const { data: languagesLevels, isLoading, error } = useGetResumeLanguageLevelsQuery(Number(resumeId));

  if (error) {
    return <PageAlert status="error" message={(error as IError).data.message} />;
  }

  if (isLoading) {
    return <Loader />;
  }

  if (!languagesLevels) {
    return <PageAlert status="error" message={'Помилка при отриманні мов з резюме'} />;
  }

  return (
    <>
      <Flex flexDir="row">
        <Heading size="md" marginTop="10px" flexGrow="1">
          Перелік мов
        </Heading>
        {isCurUser && <ResumeLanguageCreate />}
      </Flex>

      {languagesLevels.length === 0 ? (
        <Text>Мови не вказано</Text>
      ) : (
        languagesLevels.map((lang) => <ResumeLanguage key={lang.language} languageLevel={lang} />)
      )}
    </>
  );
};

export default ResumeLanguages;
