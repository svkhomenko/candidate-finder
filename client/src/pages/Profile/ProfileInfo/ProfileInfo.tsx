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
  Text,
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
      <CardHeader>
        <Flex flexDir="row">
          <Flex flexDir="column" flexGrow="1">
            <Heading mt="4" size="lg">
              {user.fullName}
            </Heading>
          </Flex>
          <Flex>
            <Button onClick={() => setIsEdit(true)} leftIcon={<Icon as={FiEdit} />}>
              Редагувати
            </Button>
          </Flex>
        </Flex>
      </CardHeader>

      <CardBody>
        <Stack divider={<StackDivider />} spacing="4">
          <HStack divider={<StackDivider />} spacing="4">
            <Text fontSize="md" colorScheme="gray">
              {`${user.email}`}
            </Text>
            <Text fontSize="md" colorScheme="gray">
              {`${user.phoneNumber}`}
            </Text>
          </HStack>
          <Box>
            {user.role === HR ? (
              <Link isExternal href="/profile/vacancies">
                <Button variant="outline">Власні вакансії</Button>
              </Link>
            ) : (
              <Link isExternal href="/profile/vacancies">
                <Button variant="outline">Власні резюме</Button>
              </Link>
            )}
          </Box>
          <Box>
            <Wrap mt="4" spacing="4">
              <Logout />
              <DeleteProfile />
            </Wrap>
          </Box>
        </Stack>
      </CardBody>
    </Card>
  );
};

export default ProfileInfo;
