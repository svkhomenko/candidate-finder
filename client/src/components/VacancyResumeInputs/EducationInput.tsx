import { FormControl, FormErrorMessage, FormLabel } from '@chakra-ui/react';
import { useState, useEffect } from 'react';
import type { FieldErrors, UseFormSetValue } from 'react-hook-form';
import type { ICreate, IUpdate } from '~/validation/resumes';
import CustomSelect from '~/components/Select/CustomSelect';
import { educationOptions } from '~/consts/resume-vacancy-options';

type IProps = {
  errors: FieldErrors<ICreate> | FieldErrors<IUpdate>;
  setValue: UseFormSetValue<ICreate> | UseFormSetValue<IUpdate>;
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
