import { Card, CardBody, Stack, Heading, Text, CardProps, Grid, GridItem } from '@chakra-ui/react';
import { capitalizeFirstLetter, getFormattedSalary, getYearWord } from './helpers';
import { Vacancy } from '~/types/vacany';
import styles from './vacancy-card.styles';

type Props = {
  vacancy: Vacancy;
} & CardProps;

const VacancyCard = ({ vacancy }: Props) => {
  return (
    <Card sx={styles.card} maxW="xl">
      <CardBody>
        <Stack spacing="3">
          <Heading size="md">{vacancy.title}</Heading>
          <Grid templateRows="repeat(3, 1fr)" templateColumns="repeat(2, 1fr)" gap={2}>
            <GridItem colSpan={1}>
              <Text color="green.800">{getFormattedSalary(vacancy.salary)}</Text>
            </GridItem>
            <GridItem colSpan={1}>
              <Text color="green.800">{vacancy.location}</Text>
            </GridItem>
            <GridItem colSpan={1}>
              <Text color="green.800">
                Досвід роботи від {vacancy.experience} {getYearWord(vacancy.experience)}
              </Text>
            </GridItem>
            <GridItem colSpan={1}>
              <Text color="green.800">{capitalizeFirstLetter(vacancy.education)}</Text>
            </GridItem>
            <GridItem colSpan={2}>
              <Text color="green.800">{capitalizeFirstLetter(vacancy.contract)} зайнятість</Text>
            </GridItem>
          </Grid>

          <Text noOfLines={4}>{vacancy.description}</Text>
        </Stack>
      </CardBody>
    </Card>
  );
};

export default VacancyCard;
