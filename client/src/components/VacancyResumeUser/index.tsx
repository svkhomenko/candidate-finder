import { Heading, HStack, StackDivider, Divider, Link } from '@chakra-ui/react';
import { useGetUserQuery } from '~/store/api/user-slice';
import PageAlert from '~/components/PageAlert';
import Loader from '~/components/Loader';
import IError from '~/types/error';

type IProps = {
  userId: number;
};

const VacancyResumeUser = ({ userId }: IProps) => {
  const { data: user, isLoading, error } = useGetUserQuery(userId);

  if (error) {
    return <PageAlert status="error" message={(error as IError).data.message} />;
  }

  if (isLoading) {
    return <Loader />;
  }

  if (!user) {
    return <PageAlert status="error" message={'Користувача не знайдено'} />;
  }

  return (
    <>
      <Divider />
      <Heading size="md">{user.fullName}</Heading>
      <HStack divider={<StackDivider />} spacing="4">
        <Link fontSize="md" href={`mailto:${user.email}`}>
          {user.email}
        </Link>
        <Link fontSize="md" href={`tel:${user.phoneNumber}`}>
          {user.phoneNumber}
        </Link>
      </HStack>
    </>
  );
};

export default VacancyResumeUser;
