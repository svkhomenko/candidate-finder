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
import {
  getFormattedSalary,
  getExpirienceStrResume,
  getOnlineStr,
  educationTranslation,
  contractTranslation,
  getFormattedRatingScore,
} from './helpers';
import type { Resume, RecommendatedResume } from '~/types/resume';
import styles from './vacancy-resume-card.styles';

type Props = {
  resume: Resume | RecommendatedResume;
} & CardProps;

const isRecommendatedResume = (o: any): o is RecommendatedResume => {
  return o && o.hasOwnProperty('ratingScore');
};

const ResumeCard = ({ resume }: Props) => {
  const isRecResume = isRecommendatedResume(resume);

  return (
    <ReactRouterLink to={`/resumes/${resume.id}`}>
      <Card sx={styles.card}>
        {isRecResume && <Circle sx={styles.ratingScore}>{getFormattedRatingScore(resume.ratingScore)}%</Circle>}

        <CardBody>
          <Stack spacing="3">
            <Heading size="md" width={isRecResume ? 'calc(100% - 40px)' : '100%'}>
              {resume.title}
            </Heading>

            {isRecResume && resume.badges.length && (
              <Wrap>
                {resume.badges.map((badge) => (
                  <WrapItem key={badge}>
                    <Tag variant="outline" width="fit-content" colorScheme="green">
                      {badge}
                    </Tag>
                  </WrapItem>
                ))}
              </Wrap>
            )}

            <Grid templateRows="repeat(3, 1fr)" templateColumns="repeat(2, 1fr)" gap={2}>
              <GridItem colSpan={1}>
                <Text color="green.800">{getFormattedSalary(resume.salaryMin, resume.salaryMax)} грн</Text>
              </GridItem>
              <GridItem colSpan={1}>
                <Text color="green.800">{resume.address}</Text>
              </GridItem>
              <GridItem colSpan={1}>
                <Text color="green.800">{getExpirienceStrResume(resume.experience)}</Text>
              </GridItem>
              <GridItem colSpan={1}>
                <Text color="green.800">{educationTranslation[resume.education]}</Text>
              </GridItem>
              <GridItem colSpan={1}>
                <Text color="green.800">{contractTranslation[resume.contract]}</Text>
              </GridItem>
              <GridItem colSpan={1}>
                <Text color="green.800">{getOnlineStr(resume.online)}</Text>
              </GridItem>
            </Grid>

            <Text noOfLines={4}>{resume.description}</Text>
          </Stack>
        </CardBody>
      </Card>
    </ReactRouterLink>
  );
};

export default ResumeCard;
