import { VStack, Flex, Heading } from '@chakra-ui/react';
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import Container from '~/components/Container';
import ResumeCard from '~/components/VacancyResumeCard/ResumeCard';
import Pagination from '~/components/Pagination';
import Loader from '~/components/Loader';
import { useGetVacancyRecommendationQuery } from '~/store/api/vacancy-slice';
import type { ResumesParam } from '~/types/resume';
import type { Vacancy } from '~/types/vacancy';

const RecommendatedResumes = () => {
  const { id: vacancyId } = useParams();

  const [curPage, setCurPage] = useState(1);
  const itemsPerPage = 10;

  const params: ResumesParam & Pick<Vacancy, 'id'> = {
    _start: (curPage - 1) * itemsPerPage,
    _end: curPage * itemsPerPage,
    id: Number(vacancyId),
  };

  const { data, isFetching } = useGetVacancyRecommendationQuery(params);

  return (
    <Container>
      {isFetching ? (
        <Loader />
      ) : data?.recommendatedResume.length ? (
        <VStack rowGap={5}>
          <Heading size="lg">Рекомендовані резюме</Heading>
          {data?.recommendatedResume.map((resume) => (
            <ResumeCard key={resume.id} resume={resume} />
          ))}
        </VStack>
      ) : (
        <Flex w="100%" alignItems="center" justifyContent="center" mt="40px">
          <Heading size="lg">Рекомендовані резюме не знайдено</Heading>
        </Flex>
      )}
      <Flex w="100%" alignItems="center" justifyContent="center" py="40px">
        {data?.recommendatedResume.length !== 0 && (
          <Pagination
            numberOfPages={Math.ceil((data?.totalCount as number) / itemsPerPage)}
            curPage={curPage}
            setCurPage={setCurPage}
          />
        )}
      </Flex>
    </Container>
  );
};

export default RecommendatedResumes;
