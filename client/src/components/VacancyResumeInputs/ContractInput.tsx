import { FormControl, FormErrorMessage, FormLabel, Checkbox, CheckboxGroup, VStack } from '@chakra-ui/react';
import type { FieldErrors, UseFormSetValue } from 'react-hook-form';
import { contractOptions } from '~/consts/resume-vacancy-options';
import type { ICreate as ICreateResume } from '~/validation/resumes';
import type { ICreate as ICreateVacancy } from '~/validation/vacancies';

type IProps = {
  errors: FieldErrors<ICreateResume> | FieldErrors<ICreateVacancy>;
  setValue: UseFormSetValue<ICreateResume> | UseFormSetValue<ICreateVacancy>;
  contract?: string;
};

const ContractInput = ({ errors, setValue, contract }: IProps) => {
  const getDefaultValue = () => {
    if (contract) {
      if (contract === 'any') {
        return ['full_time', 'part_time'];
      }
      return [contract];
    }
    return [];
  };

  const onCheckboxChange = (value: (string | number)[]) => {
    if (value.length === 0) {
      setValue('contract', '', { shouldValidate: true });
    } else if (value.length === 1) {
      setValue('contract', value[0] as string, { shouldValidate: true });
    } else {
      setValue('contract', 'any', { shouldValidate: true });
    }
  };

  return (
    <FormControl isInvalid={!!errors.contract}>
      <FormLabel htmlFor="contract">Вид зайнятості</FormLabel>
      <CheckboxGroup colorScheme="green" onChange={onCheckboxChange} defaultValue={getDefaultValue()}>
        <VStack spacing={2} alignItems="start">
          {contractOptions.map((cOpt) => (
            <Checkbox key={cOpt.value} value={cOpt.value}>
              {cOpt.label}
            </Checkbox>
          ))}
        </VStack>
      </CheckboxGroup>
      <FormErrorMessage>{errors.contract?.message}</FormErrorMessage>
    </FormControl>
  );
};

export default ContractInput;
