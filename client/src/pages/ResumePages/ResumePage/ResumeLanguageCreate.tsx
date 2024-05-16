import { Button, FormControl, FormErrorMessage, FormLabel, HStack, VStack, useDisclosure } from '@chakra-ui/react';
import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useParams } from 'react-router-dom';
import { zodResolver } from '@hookform/resolvers/zod';
import useRequestHandler from '~/hooks/use-request-handler';
import { useCreateResumeLanguageLevelMutation } from '~/store/api/resume-slice';
import { createResumeLanguageLevelSchema } from '~/validation/resumes';
import type { ICreateResumeLanguageLevel } from '~/validation/resumes';
import type { Resume } from '~/types/resume';
import { levelOptions, languageOptions } from '~/consts/resume-vacancy-options';
import CustomSelect from '~/components/Select/CustomSelect';
import DrawerWrapper from '~/components/Drawer/DrawerWrapper';
import { IoIosAddCircleOutline } from 'react-icons/io';

const ResumeLanguageCreate = () => {
  const { id: resumeId } = useParams();
  const [create, { isLoading }] = useCreateResumeLanguageLevelMutation();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const {
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<ICreateResumeLanguageLevel>({
    resolver: zodResolver(createResumeLanguageLevelSchema),
  });

  const { handler: createHandler } = useRequestHandler<ICreateResumeLanguageLevel & Pick<Resume, 'id'>>({
    f: create,
    successMsg: 'Мову успішно додано.',
  });

  const onSubmit = async (data: ICreateResumeLanguageLevel) => {
    await createHandler({ ...data, id: Number(resumeId) });
  };

  const [level, setLevel] = useState(levelOptions[0]);

  useEffect(() => {
    if (level) {
      setValue('level', level.value, { shouldValidate: true });
    }
  }, [level]);

  const [language, setLanguage] = useState(languageOptions[0]);

  useEffect(() => {
    if (language) {
      setValue('language', language.value, { shouldValidate: true });
    }
  }, [language]);

  return (
    <>
      <HStack justifyContent="end" padding="10px">
        <Button leftIcon={<IoIosAddCircleOutline />} onClick={onOpen} variant="outline">
          Додати мову
        </Button>
      </HStack>

      <DrawerWrapper isOpen={isOpen} onClose={onClose} title="Додати мову">
        <form onSubmit={handleSubmit(onSubmit)}>
          <VStack spacing="4" alignItems="start" width="100%">
            <FormControl isInvalid={!!errors.language}>
              <FormLabel htmlFor="language">Мова</FormLabel>
              <CustomSelect
                options={languageOptions}
                id="language"
                placeholder="обрати мову"
                onChange={setLanguage}
                defaultValue={languageOptions[0]}
              />
              <FormErrorMessage>{errors.language?.message}</FormErrorMessage>
            </FormControl>

            <FormControl isInvalid={!!errors.level}>
              <FormLabel htmlFor="level">Рівень володіння мовою</FormLabel>
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
              Додати
            </Button>
          </VStack>
        </form>
      </DrawerWrapper>
    </>
  );
};

export default ResumeLanguageCreate;
