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
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import useRequestHandler from '~/hooks/use-request-handler';
import { useUpdateVacancyMutation } from '~/store/api/vacancy-slice';
import { updateSchema } from '~/validation/vacancies';
import type { IUpdate } from '~/validation/vacancies';
import Layout from '~/components/Layout';
import styles from '../vacancy-card.styles';
import SalaryInput from '~/components/VacancyResumeInputs/SalaryInput';
import ExperienceInput from '~/components/VacancyResumeInputs/ExperienceInput';
import EducationInput from '~/components/VacancyResumeInputs/EducationInput';
import ContractInput from '~/components/VacancyResumeInputs/ContractInput';
import LocationInput from '~/components/PlacesSearch/LocationInput';
import { Vacancy } from '~/types/vacancy';

type IProps = {
  vacancy: Vacancy;
  setIsEdit: React.Dispatch<React.SetStateAction<boolean>>;
};

const UpdateVacancy = ({ vacancy, setIsEdit }: IProps) => {
  const [update, { isLoading }] = useUpdateVacancyMutation();
  const { id, userId, ...defaultValues } = vacancy;

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    getValues,
  } = useForm<IUpdate>({
    resolver: zodResolver(updateSchema),
    defaultValues,
  });

  const { handler: updateHandler } = useRequestHandler<IUpdate & { id: number }>({
    f: update,
    successF: () => {
      setIsEdit(false);
    },
    successMsg: 'Вакансію успішно оновлено.',
  });

  const onSubmit = async (data: IUpdate) => {
    await updateHandler({ ...data, id: vacancy.id });
  };

  return (
    <Layout>
      <Card sx={styles.card} variant="outline">
        <CardHeader>
          <Heading sx={styles.heading}>Редагувати вакансію</Heading>
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

              <SalaryInput
                errors={errors}
                register={register}
                setValue={setValue}
                getValues={getValues}
                salaryMin={vacancy.salaryMin}
                salaryMax={vacancy.salaryMax}
              />
              <ExperienceInput
                errors={errors}
                register={register}
                setValue={setValue}
                experience={vacancy.experience}
              />
              <EducationInput errors={errors} setValue={setValue} education={vacancy.education} />
              <LocationInput errors={errors} setValue={setValue} storedAddress={vacancy.address} />

              <FormControl isInvalid={!!errors.online}>
                <HStack alignContent="center">
                  <Switch id="online" {...register('online')} />
                  <FormLabel htmlFor="online" margin="0">
                    Віддалена робота
                  </FormLabel>
                </HStack>
                <FormErrorMessage>{errors.online?.message}</FormErrorMessage>
              </FormControl>

              <ContractInput errors={errors} setValue={setValue} contract={vacancy.contract} />

              <Button type="submit" w="200px" colorScheme="green" isLoading={isLoading} alignSelf="center">
                Зберегти
              </Button>
            </VStack>
          </form>
        </CardBody>
      </Card>
    </Layout>
  );
};

export default UpdateVacancy;
