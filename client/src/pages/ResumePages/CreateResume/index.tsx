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
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import CustomSelect from '~/components/Select/CustomSelect';
import useCustomToast from '~/hooks/use-custom-toast';
import { useCreateResumeMutation } from '~/store/api/resume-slice';
import { createSchema } from '~/validation/resumes';
import type { ICreate } from '~/validation/resumes';
import Layout from '~/components/Layout';
import styles from '../resume-card.styles';
import { educationOptions } from '~/consts/resume-vacancy-options';
import SalaryInput from './SalaryInput';
import ExperienceInput from './ExperienceInput';
import ContractInput from './ContractInput';
import LocationInput from '~/components/PlacesSearch/LocationInput';

const ResumeCreate = () => {
  const [create, { isLoading }] = useCreateResumeMutation();
  const navigate = useNavigate();
  const { toast } = useCustomToast();

  const [education, setEducation] = useState(educationOptions[0]);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    getValues,
  } = useForm<ICreate>({
    resolver: zodResolver(createSchema),
  });

  useEffect(() => {
    if (education) {
      setValue('education', education.value, { shouldValidate: true });
    }
  }, [education]);

  const onSubmit = async (data: ICreate) => {
    try {
      const { id } = await create(data).unwrap();
      toast('Резюме успішно створено', 'success');
      navigate(`/resumes/${id}`);
    } catch (error: any) {
      toast(error.data.message, 'error');
    }
  };

  return (
    <Layout>
      <Card sx={styles.card} variant="outline">
        <CardHeader>
          <Heading sx={styles.heading}>Створити резюме</Heading>
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

              <FormControl isInvalid={!!errors.education}>
                <FormLabel htmlFor="education">Рівень освіти</FormLabel>
                <CustomSelect
                  options={educationOptions}
                  id="education"
                  placeholder="обрати рівень освіти"
                  onChange={setEducation}
                  defaultValue={educationOptions[0]}
                />
                <FormErrorMessage>{errors.education?.message}</FormErrorMessage>
              </FormControl>

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

export default ResumeCreate;
