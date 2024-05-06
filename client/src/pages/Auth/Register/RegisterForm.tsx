import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { FormErrorMessage, FormLabel, FormControl, Input, Button, VStack } from '@chakra-ui/react';
import { zodResolver } from '@hookform/resolvers/zod';
import { registerSchema } from '~/validation/auth';
import type { IRegister } from '~/validation/auth';
import { useRegisterMutation } from '~/store/api/auth-slice';
import { useNavigate } from 'react-router-dom';
import useRequestHandler from '~/hooks/use-request-handler';
import CustomSelect from '~/components/Select/CustomSelect';
import styles from '../auth.styles';

const roleOptions = [
  {
    label: 'HR-менеджер',
    value: 'hr',
  },
  {
    label: 'Кандидат',
    value: 'candidate',
  },
];

const RegisterForm = () => {
  const [registerMutation, { isLoading }] = useRegisterMutation();
  const navigate = useNavigate();

  const [role, setRole] = useState(roleOptions[0]);

  const { handler: registerHandler } = useRequestHandler<IRegister>({
    f: registerMutation,
    successMsg:
      'Акаунт успішно створено. Будь ласка, підтвердіть email. Відповідний лист було надіслано на надану електронну пошту',
    successF: () => {
      navigate('/login');
    },
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<IRegister>({
    resolver: zodResolver(registerSchema),
  });

  useEffect(() => {
    if (role) {
      setValue('role', role.value, { shouldValidate: true });
    }
  }, [role]);

  return (
    <form onSubmit={handleSubmit(registerHandler)}>
      <VStack spacing="4">
        <FormControl isInvalid={!!errors.email} isRequired>
          <FormLabel htmlFor="email">Email</FormLabel>
          <Input id="email" placeholder="email" {...register('email')} focusBorderColor="green.600" />
          <FormErrorMessage>{errors.email?.message}</FormErrorMessage>
        </FormControl>
        <FormControl isInvalid={!!errors.password} isRequired>
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
        <FormControl isInvalid={!!errors.passwordConfirm} isRequired>
          <FormLabel htmlFor="passwordConfirm">Підтвердіть пароль</FormLabel>
          <Input
            id="passwordConfirm"
            placeholder="підтвердіть пароль"
            type="password"
            {...register('passwordConfirm')}
            focusBorderColor="green.600"
          />
          <FormErrorMessage>{errors.passwordConfirm?.message}</FormErrorMessage>
        </FormControl>
        <FormControl isInvalid={!!errors.fullName} isRequired>
          <FormLabel htmlFor="fullName">ПІБ</FormLabel>
          <Input id="fullName" placeholder="ПІБ" {...register('fullName')} focusBorderColor="green.600" />
          <FormErrorMessage>{errors.fullName?.message}</FormErrorMessage>
        </FormControl>
        <FormControl isInvalid={!!errors.phoneNumber} isRequired>
          <FormLabel htmlFor="phoneNumber">Номер телефона</FormLabel>
          <Input
            id="phoneNumber"
            placeholder="+380683333333"
            {...register('phoneNumber')}
            focusBorderColor="green.600"
          />
          <FormErrorMessage>{errors.phoneNumber?.message}</FormErrorMessage>
        </FormControl>
        <FormControl isInvalid={!!errors.role} isRequired>
          <FormLabel htmlFor="role">Роль</FormLabel>
          <CustomSelect options={roleOptions} id="role" onChange={setRole} defaultValue={roleOptions[0]} />
          <FormErrorMessage>{errors.role?.message}</FormErrorMessage>
        </FormControl>

        <Button type="submit" sx={styles.button} isLoading={isLoading} spinnerPlacement="end" loadingText="Submitting">
          Створити акаунт
        </Button>
      </VStack>
    </form>
  );
};

export default RegisterForm;
