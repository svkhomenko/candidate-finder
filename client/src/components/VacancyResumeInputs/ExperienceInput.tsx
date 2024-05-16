import { FormControl, FormErrorMessage, FormLabel, Input, Checkbox, Box } from '@chakra-ui/react';
import { useState } from 'react';
import type { FieldErrors, UseFormRegister, UseFormSetValue } from 'react-hook-form';
import type { ChangeEvent } from 'react';
import type { ICreate, IUpdate } from '~/validation/resumes';

type IProps = {
  errors: FieldErrors<ICreate> | FieldErrors<IUpdate>;
  register: UseFormRegister<ICreate> | UseFormRegister<IUpdate>;
  setValue: UseFormSetValue<ICreate> | UseFormSetValue<IUpdate>;
  experience?: number;
};

const ExperienceInput = ({ errors, register, setValue, experience }: IProps) => {
  const [isWithoutExpirience, setIsWithoutExpirience] = useState(getIsWithoutExpirience());

  function getIsWithoutExpirience() {
    if (experience === undefined) {
      return false;
    }
    return experience === 0;
  }

  const onCheckboxChange = (e: ChangeEvent<HTMLInputElement>) => {
    setIsWithoutExpirience(e.target.checked);
    setValue('experience', 0, { shouldValidate: true });
  };

  return (
    <Box>
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
      <Checkbox
        value="withoutExpirience"
        onChange={onCheckboxChange}
        defaultChecked={getIsWithoutExpirience()}
        marginTop="10px"
      >
        Без досвіду роботи
      </Checkbox>
    </Box>
  );
};

export default ExperienceInput;
