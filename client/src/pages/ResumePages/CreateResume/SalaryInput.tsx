import { FormControl, FormErrorMessage, FormLabel, Input, VStack, Radio, RadioGroup, HStack } from '@chakra-ui/react';
import { useState } from 'react';
import type { FieldErrors, UseFormRegister, UseFormSetValue, UseFormGetValues } from 'react-hook-form';
import type { ICreate } from '~/validation/resumes';
import { salaryOptions, SALARY_VALUE } from '~/consts/resume-vacancy-options';
import type { ChangeEvent } from 'react';

type IProps = {
  errors: FieldErrors<ICreate>;
  register: UseFormRegister<ICreate>;
  setValue: UseFormSetValue<ICreate>;
  getValues: UseFormGetValues<ICreate>;
};

const SalaryInput = ({ errors, register, setValue, getValues }: IProps) => {
  const [isRange, setIsRange] = useState(false);

  const onRadioChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.value === SALARY_VALUE) {
      setIsRange(false);
    } else {
      setIsRange(true);
      if (getValues('salaryMin')) {
        setValue('salaryMax', getValues('salaryMin'), { shouldValidate: true });
      }
    }
  };

  const onSalaryMinChange = () => {
    if (!isRange && getValues('salaryMin')) {
      setValue('salaryMax', getValues('salaryMin'), { shouldValidate: true });
    }
  };

  return (
    <FormControl isInvalid={!!errors.salaryMin || !!errors.salaryMax}>
      <VStack spacing="3" width="100%" alignItems="start">
        <FormLabel htmlFor="salaryMin">Зарплата ₴</FormLabel>
        <RadioGroup defaultValue={SALARY_VALUE}>
          <HStack spacing={5}>
            {salaryOptions.map((opt) => (
              <Radio colorScheme="green" key={opt.value} value={opt.value} onChange={onRadioChange}>
                {opt.label}
              </Radio>
            ))}
          </HStack>
        </RadioGroup>
        <HStack width="100%">
          {isRange && (
            <FormLabel htmlFor="salaryMin" margin="0" width="40px">
              від
            </FormLabel>
          )}
          <Input
            id="salaryMin"
            type="number"
            step="1"
            focusBorderColor="green.600"
            {...register('salaryMin', { valueAsNumber: true, onChange: onSalaryMinChange })}
          />
        </HStack>
      </VStack>
      <FormErrorMessage>{errors.salaryMin?.message}</FormErrorMessage>

      {isRange && (
        <>
          <HStack width="100%" marginTop="10px">
            <FormLabel htmlFor="salaryMax" margin="0" width="40px">
              до
            </FormLabel>
            <Input
              id="salaryMax"
              type="number"
              step="1"
              focusBorderColor="green.600"
              {...register('salaryMax', { valueAsNumber: true })}
            />
          </HStack>
          <FormErrorMessage>{errors.salaryMax?.message}</FormErrorMessage>
        </>
      )}
    </FormControl>
  );
};

export default SalaryInput;
