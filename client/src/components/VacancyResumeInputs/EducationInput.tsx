import { FormControl, FormErrorMessage, FormLabel } from '@chakra-ui/react';
import { useState, useEffect } from 'react';
import type { FieldErrors, UseFormSetValue } from 'react-hook-form';
import CustomSelect from '~/components/Select/CustomSelect';
import { educationOptions } from '~/consts/resume-vacancy-options';
import type { ICreate as ICreateResume, IUpdate as IUpdateResume } from '~/validation/resumes';
import type { ICreate as ICreateVacancy, IUpdate as IUpdateVacancy } from '~/validation/vacancies';

type IProps = {
  errors:
    | FieldErrors<ICreateResume>
    | FieldErrors<IUpdateResume>
    | FieldErrors<ICreateVacancy>
    | FieldErrors<IUpdateVacancy>;
  setValue:
    | UseFormSetValue<ICreateResume>
    | UseFormSetValue<IUpdateResume>
    | UseFormSetValue<ICreateVacancy>
    | UseFormSetValue<IUpdateVacancy>;
  education?: string;
};

const ExperienceInput = ({ errors, setValue, education }: IProps) => {
  const [educ, setEduc] = useState(getDefaultOption());

  function getDefaultOption() {
    if (education === undefined) {
      return educationOptions[0];
    }
    return educationOptions.find((opt) => opt.value === education);
  }

  useEffect(() => {
    if (educ) {
      setValue('education', educ.value, { shouldValidate: true });
    }
  }, [educ]);

  return (
    <FormControl isInvalid={!!errors.education}>
      <FormLabel htmlFor="education">Рівень освіти</FormLabel>
      <CustomSelect
        options={educationOptions}
        id="education"
        placeholder="обрати рівень освіти"
        onChange={setEduc}
        defaultValue={getDefaultOption()}
      />
      <FormErrorMessage>{errors.education?.message}</FormErrorMessage>
    </FormControl>
  );
};

export default ExperienceInput;
