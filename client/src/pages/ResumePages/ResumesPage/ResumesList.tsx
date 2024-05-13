import { VStack, Flex, Heading } from '@chakra-ui/react';
import { useState, useEffect } from 'react';
import Container from '~/components/Container';
import ResumeCard from '~/components/VacancyResumeCard/ResumeCard';
import Pagination from '~/components/Pagination';
import Loader from '~/components/Loader';
import { useGetResumesQuery } from '~/store/api/resume-slice';
import type { ResumesParam } from '~/types/resume';
import type { Contract } from '~/types/resume-vacancy-enums';

// type ResumesParam = {
//   education?: Education[] | undefined;
//   place_id?: string | undefined;
//   online?: boolean | undefined;
// }

type IProps = {
  q: string;
  contract: Contract[];
  salaryMin: number | null;
  salaryMax: number | null;
  experienceMin: number | null;
  experienceMax: number | null;
};

const ResumesList = ({ q, contract, salaryMin, salaryMax, experienceMin, experienceMax }: IProps) => {
  const [curPage, setCurPage] = useState(1);
  const itemsPerPage = 10;

  const params: ResumesParam = {
    _start: (curPage - 1) * itemsPerPage,
    _end: curPage * itemsPerPage,
  };
  q ? (params.q = q) : (params.q = undefined);
  contract && contract.length !== 0 ? (params.contract = contract) : (params.contract = undefined);
  salaryMin ? (params.salaryMin = salaryMin) : (params.salaryMin = undefined);
  salaryMax ? (params.salaryMax = salaryMax) : (params.salaryMax = undefined);
  experienceMin || experienceMin === 0 ? (params.experienceMin = experienceMin) : (params.experienceMin = undefined);
  experienceMax || experienceMax === 0 ? (params.experienceMax = experienceMax) : (params.experienceMax = undefined);

  useEffect(() => {
    setCurPage(1);
  }, [q, contract, salaryMin, salaryMax, experienceMin, experienceMax]);

  const { data, isFetching } = useGetResumesQuery(params);

  return (
    <Container>
      {isFetching ? (
        <Loader />
      ) : data?.resumes.length ? (
        <VStack rowGap={5}>
          {data?.resumes.map((resume) => (
            <ResumeCard key={resume.id} resume={resume} />
          ))}
        </VStack>
      ) : (
        <Flex w="100%" alignItems="center" justifyContent="center" mt="40px">
          <Heading size="lg">Резюме не знайдено</Heading>
        </Flex>
      )}
      <Flex w="100%" alignItems="center" justifyContent="center" py="40px">
        {data?.resumes.length !== 0 && (
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

export default ResumesList;
