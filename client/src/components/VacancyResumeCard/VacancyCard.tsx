import { Card, CardBody, Stack, Heading, Text, CardProps, Grid, GridItem } from '@chakra-ui/react';
import { Link as ReactRouterLink } from 'react-router-dom';
import {
  getFormattedSalary,
  getExpirienceStrVacancy,
  getOnlineStr,
  educationTranslation,
  contractTranslation,
} from './helpers';
import type { Vacancy } from '~/types/vacancy';
import styles from './vacancy-resume-card.styles';

type Props = {
  vacancy: Vacancy;
} & CardProps;

const VacancyCard = ({ vacancy }: Props) => {
  return (
    <ReactRouterLink to={`/vacancies/${vacancy.id}`}>
      <Card sx={styles.card}>
        <CardBody>
          <Stack spacing="3">
            <Heading size="md" width="100%">
              {vacancy.title}
            </Heading>

            <Grid templateRows="repeat(3, 1fr)" templateColumns="repeat(2, 1fr)" gap={2}>
              <GridItem colSpan={1}>
                <Text color="green.800">{getFormattedSalary(vacancy.salaryMin, vacancy.salaryMax)} грн</Text>
              </GridItem>
              <GridItem colSpan={1}>
                <Text color="green.800">{vacancy.address}</Text>
              </GridItem>
              <GridItem colSpan={1}>
                <Text color="green.800">{getExpirienceStrVacancy(vacancy.experience)}</Text>
              </GridItem>
              <GridItem colSpan={1}>
                <Text color="green.800">{educationTranslation[vacancy.education]}</Text>
              </GridItem>
              <GridItem colSpan={1}>
                <Text color="green.800">{contractTranslation[vacancy.contract]}</Text>
              </GridItem>
              <GridItem colSpan={1}>
                <Text color="green.800">{getOnlineStr(vacancy.online)}</Text>
              </GridItem>
            </Grid>

            <Text noOfLines={4}>{vacancy.description}</Text>
          </Stack>
        </CardBody>
      </Card>
    </ReactRouterLink>
  );
};

export default VacancyCard;
