import {
  Button,
  Card,
  CardHeader,
  CardBody,
  Heading,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  VStack,
} from '@chakra-ui/react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { useAppSelector } from '~/hooks/use-app-selector';
import useCustomToast from '~/hooks/use-custom-toast';
import { useUpdateProfileMutation } from '~/store/api/profile-slice';
import { updateSchema } from '~/validation/profile';
import type { IUpdate } from '~/validation/profile';
import styles from '../profile-card.styles';

type IProps = { setIsEdit: React.Dispatch<React.SetStateAction<boolean>> };

const ProfileForm = ({ setIsEdit }: IProps) => {
  const { toast } = useCustomToast();
  const { user } = useAppSelector((state) => state.profile);

  const [update, { isLoading }] = useUpdateProfileMutation();
  const { id, role, ...defaultValues } = user;

  const updateHandler = async (data: IUpdate) => {
    try {
      const { isConfirmed } = await update(data).unwrap();
      if (isConfirmed) {
        toast('Акаунт успішно оновлено.', 'success');
      } else {
        toast(
          'Акаунт успішно оновлено. Будь ласка, підтвердіть email. Відповідний лист було надіслано на надану електронну пошту',
          'success',
        );
      }
      setIsEdit(false);
    } catch (error: any) {
      toast(error.data.message, 'error');
    }
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IUpdate>({
    resolver: zodResolver(updateSchema),
    defaultValues,
  });

  return (
    <Card sx={styles.card} variant="outline">
      <CardHeader>
        <Heading sx={styles.heading}>Редагувати акаунт</Heading>
      </CardHeader>
      <CardBody>
        <form onSubmit={handleSubmit(updateHandler)}>
          <VStack spacing="4">
            <FormControl isInvalid={!!errors.email}>
              <FormLabel htmlFor="email">Email</FormLabel>
              <Input id="email" placeholder="email" {...register('email')} focusBorderColor="green.600" />
              <FormErrorMessage>{errors.email?.message}</FormErrorMessage>
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
            <Button type="submit" w="200px" isLoading={isLoading}>
              Зберегти
            </Button>
          </VStack>
        </form>
      </CardBody>
    </Card>
  );
};

export default ProfileForm;
