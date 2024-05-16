import { FormControl, FormErrorMessage, FormLabel, Input, VStack, Radio, RadioGroup, HStack } from '@chakra-ui/react';
import { useState } from 'react';
import type { FieldErrors, UseFormRegister, UseFormSetValue, UseFormGetValues } from 'react-hook-form';
import type { ICreate, IUpdate } from '~/validation/resumes';
import { salaryOptions, SALARY_VALUE, SALARY_RANGE } from '~/consts/resume-vacancy-options';
import type { ChangeEvent } from 'react';

type IProps = {
  errors: FieldErrors<ICreate> | FieldErrors<IUpdate>;
  register: UseFormRegister<ICreate> | UseFormRegister<IUpdate>;
  setValue: UseFormSetValue<ICreate> | UseFormSetValue<IUpdate>;
  getValues: UseFormGetValues<ICreate> | UseFormGetValues<IUpdate>;
  salaryMin?: number;
  salaryMax?: number;
};

const SalaryInput = ({ errors, register, setValue, getValues, salaryMin, salaryMax }: IProps) => {
  const [isRange, setIsRange] = useState(getIsRange());

  function getIsRange() {
    if (salaryMin === undefined) {
      return false;
    }
    return salaryMin !== salaryMax;
  }

  const getRadioDefaultValue = () => {
    if (salaryMin === undefined) {
      return SALARY_VALUE;
    }
    return salaryMin !== salaryMax ? SALARY_RANGE : SALARY_VALUE;
  };

  const onRadioChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.value === SALARY_VALUE) {
      setIsRange(false);
    } else {
      setIsRange(true);

      let formValues = getValues();
      if (formValues['salaryMin']) {
        setValue('salaryMax', formValues['salaryMin'], { shouldValidate: true });
      }
    }
  };

  const onSalaryMinChange = () => {
    let formValues = getValues();
    if (!isRange && formValues['salaryMin']) {
      setValue('salaryMax', formValues['salaryMin'], { shouldValidate: true });
    }
  };

  return (
    <FormControl isInvalid={!!errors.salaryMin || !!errors.salaryMax}>
      <FormLabel htmlFor="salaryMin">Зарплата ₴</FormLabel>
      <VStack spacing="3" width="100%" alignItems="start">
        <RadioGroup defaultValue={getRadioDefaultValue()}>
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
