import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Heading,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  VStack,
  Textarea,
  Switch,
  HStack,
} from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import useCustomToast from '~/hooks/use-custom-toast';
import { useCreateVacancyMutation } from '~/store/api/vacancy-slice';
import { createSchema } from '~/validation/vacancies';
import type { ICreate } from '~/validation/vacancies';
import Layout from '~/components/Layout';
import styles from '../vacancy-card.styles';
import SalaryInput from '~/components/VacancyResumeInputs/SalaryInput';
import ExperienceInput from '~/components/VacancyResumeInputs/ExperienceInput';
import EducationInput from '~/components/VacancyResumeInputs/EducationInput';
import ContractInput from '~/components/VacancyResumeInputs/ContractInput';
import LocationInput from '~/components/PlacesSearch/LocationInput';

const CreateVacancy = () => {
  const [create, { isLoading }] = useCreateVacancyMutation();
  const navigate = useNavigate();
  const { toast } = useCustomToast();

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    getValues,
  } = useForm<ICreate>({
    resolver: zodResolver(createSchema),
  });

  const onSubmit = async (data: ICreate) => {
    try {
      const { id } = await create(data).unwrap();
      toast('Вакансію успішно створено', 'success');
      navigate(`/vacancies/${id}`);
    } catch (error: any) {
      toast(error.data.message, 'error');
    }
  };

  return (
    <Layout>
      <Card sx={styles.card} variant="outline">
        <CardHeader>
          <Heading sx={styles.heading}>Створити вакансію</Heading>
        </CardHeader>

        <CardBody>
          <form onSubmit={handleSubmit(onSubmit)}>
            <VStack spacing="4" alignItems="start" width="100%">
              <FormControl isInvalid={!!errors.title}>
                <FormLabel htmlFor="title">Назва посади</FormLabel>
                <Input id="title" placeholder="назва посади" {...register('title')} focusBorderColor="green.600" />
                <FormErrorMessage>{errors.title?.message}</FormErrorMessage>
              </FormControl>
              <FormControl isInvalid={!!errors.description}>
                <FormLabel htmlFor="description">Опис посади</FormLabel>
                <Textarea
                  id="description"
                  placeholder="опис посади"
                  {...register('description')}
                  focusBorderColor="green.600"
                />
                <FormErrorMessage>{errors.description?.message}</FormErrorMessage>
              </FormControl>

              <SalaryInput errors={errors} register={register} setValue={setValue} getValues={getValues} />
              <ExperienceInput errors={errors} register={register} setValue={setValue} />
              <EducationInput errors={errors} setValue={setValue} />
              <LocationInput errors={errors} setValue={setValue} />

              <FormControl isInvalid={!!errors.online}>
                <HStack alignContent="center">
                  <Switch id="online" {...register('online')} />
                  <FormLabel htmlFor="online" margin="0">
                    Віддалена робота
                  </FormLabel>
                </HStack>
                <FormErrorMessage>{errors.online?.message}</FormErrorMessage>
              </FormControl>

              <ContractInput errors={errors} setValue={setValue} />

              <Button
                type="submit"
                w="200px"
                colorScheme="green"
                isLoading={isLoading}
                spinnerPlacement="end"
                loadingText="Submitting"
              >
                Створити
              </Button>
            </VStack>
          </form>
        </CardBody>
      </Card>
    </Layout>
  );
};

export default CreateVacancy;
