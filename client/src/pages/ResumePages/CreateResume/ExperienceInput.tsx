import { FormControl, FormErrorMessage, FormLabel, Input, Checkbox } from '@chakra-ui/react';
import { useState } from 'react';
import type { FieldErrors, UseFormRegister, UseFormSetValue } from 'react-hook-form';
import type { ChangeEvent } from 'react';
import type { ICreate } from '~/validation/resumes';

type IProps = {
  errors: FieldErrors<ICreate>;
  register: UseFormRegister<ICreate>;
  setValue: UseFormSetValue<ICreate>;
};

const ExperienceInput = ({ errors, register, setValue }: IProps) => {
  const [isWithoutExpirience, setIsWithoutExpirience] = useState(false);

  const onCheckboxChange = (e: ChangeEvent<HTMLInputElement>) => {
    setIsWithoutExpirience(e.target.checked);
    setValue('experience', 0, { shouldValidate: true });
  };

  return (
    <>
      <FormControl isInvalid={!!errors.experience}>
        <FormLabel htmlFor="experience">Роки досвіду роботи</FormLabel>
        {!isWithoutExpirience && (
          <>
            <Input
              id="experience"
              type="number"
              step="1"
              focusBorderColor="green.600"
              marginTop="10px"
              {...register('experience', { valueAsNumber: true })}
            />
            <FormErrorMessage>{errors.experience?.message}</FormErrorMessage>
          </>
        )}
      </FormControl>
      <Checkbox value="withoutExpirience" onChange={onCheckboxChange}>
        Без досвіду роботи
      </Checkbox>
    </>
  );
};

export default ExperienceInput;
