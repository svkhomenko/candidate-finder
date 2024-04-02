import { VStack } from '@chakra-ui/react';
import VacancyCard from '../VacancyCard';
import { Vacancy } from '~/types/vacany';
import Pagination from '../Pagination';

type Props = {
  vacancies: Array<Vacancy>;
};

const VacancyCardList = ({ vacancies }: Props) => {
  return (
    <VStack rowGap={5} padding="30px 0">
      {vacancies.map((vacancy) => (
        <VacancyCard key={vacancy.id} vacancy={vacancy} />
      ))}
      <Pagination numberOfPages={2} curPage={1} />
    </VStack>
  );
};

export default VacancyCardList;
