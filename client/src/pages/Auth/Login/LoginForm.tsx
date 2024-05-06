import { useForm } from 'react-hook-form';
import { FormErrorMessage, FormLabel, FormControl, Input, Button, VStack } from '@chakra-ui/react';
import { zodResolver } from '@hookform/resolvers/zod';
import { loginSchema } from '~/validation/auth';
import type { ILogin } from '~/validation/auth';
import { useLoginMutation } from '~/store/api/auth-slice';
import { useNavigate } from 'react-router-dom';
import useRequestHandler from '~/hooks/use-request-handler';
import styles from '../auth.styles';

const LoginForm = () => {
  const [login, { isLoading }] = useLoginMutation();
  const navigate = useNavigate();

  const { handler: loginHandler } = useRequestHandler<ILogin>({
    f: login,
    successF: () => {
      navigate('/');
    },
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ILogin>({
    resolver: zodResolver(loginSchema),
  });

  return (
    <form onSubmit={handleSubmit(loginHandler)}>
      <VStack spacing="5">
        <FormControl isInvalid={!!errors.email} isRequired>
          <FormLabel htmlFor="email">Email</FormLabel>
          <Input id="email" placeholder="email" {...register('email')} focusBorderColor="green.600" />
          <FormErrorMessage>{errors.email?.message}</FormErrorMessage>
        </FormControl>
        <FormControl isInvalid={!!errors.password}>
          <FormLabel htmlFor="password">Пароль</FormLabel>
          <Input
            id="password"
            placeholder="пароль"
            type="password"
            {...register('password')}
            focusBorderColor="green.600"
          />
          <FormErrorMessage>{errors.password?.message}</FormErrorMessage>
        </FormControl>
        <Button type="submit" sx={styles.button} isLoading={isLoading} spinnerPlacement="end" loadingText="Submitting">
          Увійти
        </Button>
      </VStack>
    </form>
  );
};

export default LoginForm;
