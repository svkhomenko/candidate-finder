import {
  Card,
  CardBody,
  Stack,
  Heading,
  Text,
  CardProps,
  Grid,
  GridItem,
  Circle,
  Tag,
  Wrap,
  WrapItem,
} from '@chakra-ui/react';
import { Link as ReactRouterLink } from 'react-router-dom';
import { capitalizeFirstLetter, getFormattedSalary, getYearWord } from './helpers';
import { Vacancy, RecomendedResume } from '~/types/vacany';
import styles from './vacancy-card.styles';

type Props = {
  vacancy: Vacancy | RecomendedResume;
} & CardProps;

const isRecomendedResume = (o: any): o is RecomendedResume => {
  return o && o.hasOwnProperty('ratingScore');
};

const VacancyCard = ({ vacancy }: Props) => {
  const isRecResume = isRecomendedResume(vacancy);

  return (
    <ReactRouterLink to={`/vacancies/${vacancy.id}`}>
      <Card sx={styles.card}>
        {isRecResume && <Circle sx={styles.ratingScore}>{vacancy.ratingScore}%</Circle>}

        <CardBody>
          <Stack spacing="3">
            <Heading size="md" width={isRecResume ? 'calc(100% - 40px)' : '100%'}>
              {vacancy.title}
            </Heading>

            {isRecResume && vacancy.badges.length && (
              <Wrap>
                {vacancy.badges.map((badge) => (
                  <WrapItem>
                    <Tag variant="outline" width="fit-content" colorScheme="green">
                      {badge}
                    </Tag>
                  </WrapItem>
                ))}
              </Wrap>
            )}

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
    </ReactRouterLink>
  );
};

export default VacancyCard;
