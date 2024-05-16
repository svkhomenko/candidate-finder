import { Button, FormControl, FormErrorMessage, FormLabel, VStack } from '@chakra-ui/react';
import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useParams } from 'react-router-dom';
import { zodResolver } from '@hookform/resolvers/zod';
import useRequestHandler from '~/hooks/use-request-handler';
import { useUpdateResumeLanguageLevelMutation } from '~/store/api/resume-slice';
import { updateResumeLanguageLevelSchema } from '~/validation/resumes';
import type { IUpdateResumeLanguageLevel } from '~/validation/resumes';
import type { Resume, ResumeLanguageLevel } from '~/types/resume';
import { levelOptions } from '~/consts/resume-vacancy-options';
import CustomSelect from '~/components/Select/CustomSelect';
import { languageTranslation } from '~/components/VacancyResumeCard/helpers';

type IProps = {
  languageLevel: ResumeLanguageLevel;
  setIsEdit: React.Dispatch<React.SetStateAction<boolean>>;
};

const ResumeLanguageUpdate = ({ languageLevel, setIsEdit }: IProps) => {
  const { id: resumeId } = useParams();
  const [update, { isLoading }] = useUpdateResumeLanguageLevelMutation();

  const {
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<IUpdateResumeLanguageLevel>({
    resolver: zodResolver(updateResumeLanguageLevelSchema),
  });

  const { handler: updateHandler } = useRequestHandler<
    IUpdateResumeLanguageLevel & Pick<Resume, 'id'> & Pick<ResumeLanguageLevel, 'language'>
  >({
    f: update,
    successF: () => {
      setIsEdit(false);
    },
    successMsg: 'Рівень володіння мовою успішно оновлено.',
  });

  const onSubmit = async (data: IUpdateResumeLanguageLevel) => {
    await updateHandler({ ...data, id: Number(resumeId), language: languageLevel.language });
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

export default ResumeLanguageUpdate;
