import { Button, FormControl, FormErrorMessage, FormLabel, VStack } from '@chakra-ui/react';
import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useParams } from 'react-router-dom';
import { zodResolver } from '@hookform/resolvers/zod';
import useRequestHandler from '~/hooks/use-request-handler';
import { useUpdateVacancyLanguageLevelMutation } from '~/store/api/vacancy-slice';
import { updateVacancyLanguageLevelSchema } from '~/validation/vacancies';
import type { IUpdateVacancyLanguageLevel } from '~/validation/vacancies';
import type { Vacancy, VacancyLanguageLevel } from '~/types/vacancy';
import { levelOptions } from '~/consts/resume-vacancy-options';
import CustomSelect from '~/components/Select/CustomSelect';
import { languageTranslation } from '~/components/VacancyResumeCard/helpers';

type IProps = {
  languageLevel: VacancyLanguageLevel;
  setIsEdit: React.Dispatch<React.SetStateAction<boolean>>;
};

const VacancyLanguageUpdate = ({ languageLevel, setIsEdit }: IProps) => {
  const { id: vacancyId } = useParams();
  const [update, { isLoading }] = useUpdateVacancyLanguageLevelMutation();

  const {
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<IUpdateVacancyLanguageLevel>({
    resolver: zodResolver(updateVacancyLanguageLevelSchema),
  });

  const { handler: updateHandler } = useRequestHandler<
    IUpdateVacancyLanguageLevel & Pick<Vacancy, 'id'> & Pick<VacancyLanguageLevel, 'language'>
  >({
    f: update,
    successF: () => {
      setIsEdit(false);
    },
    successMsg: 'Рівень володіння мовою успішно оновлено.',
  });

  const onSubmit = async (data: IUpdateVacancyLanguageLevel) => {
    await updateHandler({ ...data, id: Number(vacancyId), language: languageLevel.language });
  };

  const [level, setLevel] = useState(levelOptions[0]);

  useEffect(() => {
    if (level) {
      setValue('level', level.value, { shouldValidate: true });
    }
  }, [level]);

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <VStack spacing="4" alignItems="start" width="100%">
          <FormControl isInvalid={!!errors.level}>
            <FormLabel htmlFor="level">Рівень володіння мовою {languageTranslation[languageLevel.language]}</FormLabel>
            <CustomSelect
              options={levelOptions}
              id="level"
              placeholder="обрати рівень володіння мовою"
              onChange={setLevel}
              defaultValue={levelOptions[0]}
            />
            <FormErrorMessage>{errors.level?.message}</FormErrorMessage>
          </FormControl>

          <Button type="submit" w="200px" colorScheme="green" isLoading={isLoading}>
            Зберегти
          </Button>
        </VStack>
      </form>
    </>
  );
};

export default VacancyLanguageUpdate;
