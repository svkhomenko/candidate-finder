import { VStack, Heading } from '@chakra-ui/react';
import VacancyCard from '../VacancyCard';
import { Vacancy, RecomendedResume } from '~/types/vacany';
import Pagination from '../Pagination';

type Props = {
  vacancies: Array<Vacancy> | Array<RecomendedResume>;
  title?: string;
};

const VacancyCardList = ({ vacancies, title }: Props) => {
  return (
    <VStack rowGap={5} padding="30px 0">
      {title && <Heading size="lg">{title}</Heading>}
      {vacancies.map((vacancy) => (
        <VacancyCard key={vacancy.id} vacancy={vacancy} />
      ))}
      <Pagination numberOfPages={2} curPage={1} />
    </VStack>
  );
};

export default VacancyCardList;
