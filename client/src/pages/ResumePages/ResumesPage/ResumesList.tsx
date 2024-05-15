import { VStack, Flex, Heading } from '@chakra-ui/react';
import { useState, useEffect } from 'react';
import Container from '~/components/Container';
import ResumeCard from '~/components/VacancyResumeCard/ResumeCard';
import Pagination from '~/components/Pagination';
import Loader from '~/components/Loader';
import { useGetResumesQuery } from '~/store/api/resume-slice';
import type { ResumesParam } from '~/types/resume';
import type { Contract, Education } from '~/types/resume-vacancy-enums';
import { useAppSelector } from '~/hooks/use-app-selector';

type IProps = {
  q: string;
  place_id: string;
  contract: Contract[];
  salaryMin: number | null;
  salaryMax: number | null;
  experienceMin: number | null;
  experienceMax: number | null;
  online: boolean;
  education: Education[];
  isProfileResumes?: boolean;
};

const ResumesList = ({
  q,
  place_id,
  contract,
  salaryMin,
  salaryMax,
  experienceMin,
  experienceMax,
  online,
  education,
  isProfileResumes,
}: IProps) => {
  const { user } = useAppSelector((state) => state.profile);

  const [curPage, setCurPage] = useState(1);
  const itemsPerPage = 10;

  const params: ResumesParam = {
    _start: (curPage - 1) * itemsPerPage,
    _end: curPage * itemsPerPage,
  };
  q ? (params.q = q) : (params.q = undefined);
  place_id ? (params.place_id = place_id) : (params.place_id = undefined);
  contract && contract.length !== 0 ? (params.contract = contract) : (params.contract = undefined);
  salaryMin ? (params.salaryMin = salaryMin) : (params.salaryMin = undefined);
  salaryMax ? (params.salaryMax = salaryMax) : (params.salaryMax = undefined);
  experienceMin || experienceMin === 0 ? (params.experienceMin = experienceMin) : (params.experienceMin = undefined);
  experienceMax || experienceMax === 0 ? (params.experienceMax = experienceMax) : (params.experienceMax = undefined);
  online ? (params.online = online) : (params.online = undefined);
  education && education.length !== 0 ? (params.education = education) : (params.education = undefined);

  if (isProfileResumes && user.id) {
    params.userId = Number(user.id);
  }

  useEffect(() => {
    setCurPage(1);
  }, [q, contract, salaryMin, salaryMax, experienceMin, experienceMax, online, education]);

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
