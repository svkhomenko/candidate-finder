import {
  Box,
  Button,
  Card,
  CardBody,
  CardHeader,
  Flex,
  Icon,
  Heading,
  HStack,
  Stack,
  StackDivider,
  Wrap,
  Link,
} from '@chakra-ui/react';
import { FiEdit } from 'react-icons/fi';
import { useAppSelector } from '~/hooks/use-app-selector';
import Logout from './Logout';
import DeleteProfile from './DeleteProfile';
import { HR } from '~/consts/consts';
import styles from '../profile-card.styles';

type IProps = { setIsEdit: React.Dispatch<React.SetStateAction<boolean>> };

const ProfileInfo = ({ setIsEdit }: IProps) => {
  const { user } = useAppSelector((state) => state.profile);

  return (
    <Card sx={styles.card} variant="outline">
      <CardHeader pb="1">
        <Flex flexDir="row" alignItems="center">
          <Heading size="lg" flexGrow="1">
            {user.fullName}
          </Heading>
          <Button onClick={() => setIsEdit(true)} leftIcon={<Icon as={FiEdit} />}>
            Редагувати
          </Button>
        </Flex>
      </CardHeader>

      <CardBody>
        <Stack divider={<StackDivider />} spacing="4">
          <HStack divider={<StackDivider />} spacing="4">
            <Link fontSize="md" href={`mailto:${user.email}`}>
              {user.email}
            </Link>
            <Link fontSize="md" href={`tel:${user.phoneNumber}`}>
              {user.phoneNumber}
            </Link>
          </HStack>
          <Box>
            {user.role === HR ? (
              <Link isExternal href="/profile/vacancies">
                <Button variant="outline">Власні вакансії</Button>
              </Link>
            ) : (
              <Link isExternal href="/profile/resumes">
                <Button variant="outline">Власні резюме</Button>
              </Link>
            )}
          </Box>
          <Wrap spacing="4">
            <Logout />
            <DeleteProfile />
          </Wrap>
        </Stack>
      </CardBody>
    </Card>
  );
};

export default ProfileInfo;
