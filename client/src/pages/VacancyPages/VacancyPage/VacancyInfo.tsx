import { Card, CardBody, Stack, Heading, Text } from '@chakra-ui/react';
import { capitalizeFirstLetter, getFormattedSalary, getYearWord } from '~/components/VacancyCard/helpers';
import { Vacancy } from '~/types/vacany';
import styles from './vacancy-info.styles';

type Props = {
  vacancy: Vacancy;
};

const VacancyInfo = ({ vacancy }: Props) => {
  return (
    <Card sx={styles.card}>
      <CardBody>
        <Stack spacing="3">
          <Heading size="lg">{vacancy.title}</Heading>
          <Text color="green.800">{getFormattedSalary(vacancy.salary)}</Text>
          <Text color="green.800">{vacancy.location}</Text>
          <Text color="green.800">
            Досвід роботи від {vacancy.experience} {getYearWord(vacancy.experience)}
          </Text>
          <Text color="green.800">Необхідний рівень освіти: {vacancy.education}</Text>
          <Text color="green.800">{capitalizeFirstLetter(vacancy.contract)} зайнятість</Text>

          <Heading size="md" marginTop="20px">
            Опис вакансії
          </Heading>
          <Text whiteSpace="pre-line">{vacancy.description}</Text>
        </Stack>
      </CardBody>
    </Card>
  );
};

export default VacancyInfo;
