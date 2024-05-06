import { useEffect } from 'react';
import { useSearchParams, Link as RouterLink } from 'react-router-dom';
import { Button } from '@chakra-ui/react';
import { useConfirmEmailMutation } from '~/store/api/auth-slice';
import Loader from '~/components/Loader';
import PageAlert from '~/components/PageAlert';
import IError from '~/types/error';

const AlertSuccess = () => {
  return (
    <PageAlert
      status="success"
      title="Email успішно підтверджено"
      message="Ви успішно підтвердили email. Тепер ви можете увійти в акаунт."
    >
      <Button colorScheme="green" as={RouterLink} to="/login">
        Увійти
      </Button>
    </PageAlert>
  );
};

const AlertError = ({ message }: { message: string }) => {
  return (
    <PageAlert status="error" title="Помилка підтвердження!" message={message}>
      <Button colorScheme="red" as={RouterLink} to="/">
        На головну
      </Button>
    </PageAlert>
  );
};

const EmailConfirmation = () => {
  const [searchParams] = useSearchParams();
  const confirmToken = searchParams.get('confirmToken');
  const [comfirmEmail, { isLoading, isError, error }] = useConfirmEmailMutation();

  useEffect(() => {
    if (confirmToken) {
      comfirmEmail({ confirmToken });
    }
  }, [confirmToken]);

  if (isLoading) {
    return <Loader />;
  }

  if (isError) {
    return <AlertError message={(error as IError).data.message} />;
  }

  return <AlertSuccess />;
};

export default EmailConfirmation;
