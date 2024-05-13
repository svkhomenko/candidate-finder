import {
  CheckboxGroup,
  VStack,
  HStack,
  Checkbox,
  FormLabel,
  NumberInput,
  NumberInputField,
  Button,
  useDisclosure,
} from '@chakra-ui/react';
import DrawerWrapper from '~/components/Drawer/DrawerWrapper';
import { IoFilter } from 'react-icons/io5';
import { useForm } from 'react-hook-form';
import { contractOptions } from './filter-options';
import type { Contract } from '~/types/resume-vacancy-enums';
import { INT_MAX } from '~/consts/validation';

export type IFilter = {
  contact: Contract[];
  salaryMin: number;
  salaryMax: number;
  experienceMin: number;
  experienceMax: number;
};

type IProps = {
  setContract: React.Dispatch<React.SetStateAction<Contract[]>>;
  setSalaryMin: React.Dispatch<React.SetStateAction<number | null>>;
  setSalaryMax: React.Dispatch<React.SetStateAction<number | null>>;
  setExperienceMin: React.Dispatch<React.SetStateAction<number | null>>;
  setExperienceMax: React.Dispatch<React.SetStateAction<number | null>>;
};

const VacancyResumeFilters = ({
  setContract,
  setSalaryMin,
  setSalaryMax,
  setExperienceMin,
  setExperienceMax,
}: IProps) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { register, getValues } = useForm<IFilter>();

  return (
    <>
      <HStack justifyContent="end" padding="10px">
        <Button leftIcon={<IoFilter />} onClick={onOpen}>
          Фільтри
        </Button>
      </HStack>

      <DrawerWrapper isOpen={isOpen} onClose={onClose} title="Фільтри пошуку">
        <VStack spacing={5} alignItems="start">
          <CheckboxGroup colorScheme="green">
            <VStack spacing={2} alignItems="start">
              <FormLabel htmlFor="contract" margin="0" fontWeight="700">
                Вид зайнятості
              </FormLabel>
              {contractOptions.map((cOpt) => (
                <Checkbox
                  key={cOpt.value}
                  value={cOpt.value}
                  {...register('contact', {
                    onChange: () => {
                      setContract(getValues('contact'));
                    },
                  })}
                >
                  {cOpt.lable}
                </Checkbox>
              ))}
            </VStack>
          </CheckboxGroup>

          <VStack spacing={2} alignItems="start">
            <FormLabel margin="0" fontWeight="700">
              Зарплата
            </FormLabel>
            <HStack gap={5}>
              <FormLabel htmlFor="salaryMin" margin="0">
                від
              </FormLabel>
              <NumberInput focusBorderColor="green.600" min={1} max={INT_MAX} id="salaryMin" maxWidth="150px">
                <NumberInputField
                  {...register('salaryMin', {
                    onBlur: () => {
                      let sMin = getValues('salaryMin');
                      if (Number.isNaN(sMin)) {
                        setSalaryMin(null);
                      } else {
                        sMin = sMin < 1 ? 1 : sMin;
                        sMin = sMin > INT_MAX ? INT_MAX : sMin;
                        setSalaryMin(sMin);
                      }
                    },
                  })}
                />
              </NumberInput>
              <FormLabel htmlFor="salaryMin" margin="0">
                грн
              </FormLabel>
            </HStack>
            <HStack gap={5}>
              <FormLabel htmlFor="salaryMax" margin="0">
                до
              </FormLabel>
              <NumberInput focusBorderColor="green.600" min={1} max={INT_MAX} id="salaryMax" maxWidth="150px">
                <NumberInputField
                  {...register('salaryMax', {
                    onBlur: () => {
                      let sMax = getValues('salaryMax');
                      if (Number.isNaN(sMax)) {
                        setSalaryMax(null);
                      } else {
                        sMax = sMax < 1 ? 1 : sMax;
                        sMax = sMax > INT_MAX ? INT_MAX : sMax;
                        setSalaryMin(sMax);
                      }
                    },
                  })}
                />
              </NumberInput>
              <FormLabel htmlFor="salaryMax" margin="0">
                грн
              </FormLabel>
            </HStack>
          </VStack>

          <VStack spacing={2} alignItems="start">
            <FormLabel margin="0" fontWeight="700">
              Досвід роботи
            </FormLabel>
            <HStack gap={5}>
              <FormLabel htmlFor="experienceMin" margin="0">
                від
              </FormLabel>
              <NumberInput focusBorderColor="green.600" min={0} max={INT_MAX} id="experienceMin" maxWidth="150px">
                <NumberInputField
                  {...register('experienceMin', {
                    onBlur: () => {
                      let exp = getValues('experienceMin');
                      if (Number.isNaN(exp)) {
                        setExperienceMin(null);
                      } else {
                        setExperienceMin(exp < 0 ? 0 : exp);
                      }
                    },
                  })}
                />
              </NumberInput>
              <FormLabel htmlFor="experienceMin" margin="0">
                роки
              </FormLabel>
            </HStack>
            <HStack gap={5}>
              <FormLabel htmlFor="experienceMax" margin="0">
                до
              </FormLabel>
              <NumberInput focusBorderColor="green.600" min={0} max={INT_MAX} id="experienceMax" maxWidth="150px">
                <NumberInputField
                  {...register('experienceMax', {
                    onBlur: () => {
                      let exp = getValues('experienceMax');
                      if (Number.isNaN(exp)) {
                        setExperienceMax(null);
                      } else {
                        setExperienceMax(exp < 0 ? 0 : exp);
                      }
                    },
                  })}
                />
              </NumberInput>
              <FormLabel htmlFor="experienceMax" margin="0">
                роки
              </FormLabel>
            </HStack>
          </VStack>
        </VStack>
      </DrawerWrapper>
    </>
  );
};

export default VacancyResumeFilters;

// import {
//   CheckboxGroup,
//   Stack,
//   VStack,
//   HStack,
//   Checkbox,
//   FormLabel,
//   NumberInput,
//   NumberInputField,
// } from '@chakra-ui/react';

// const VacancyResumeFilters = () => {
//   return (
//     <Stack direction={['column', 'row']} spacing="30px" margin="20px 30px">
//       <CheckboxGroup colorScheme="green">
//         <VStack spacing={2} alignItems="start">
//           <FormLabel htmlFor="contract" margin="0" fontWeight="700">
//             Вид зайнятості
//           </FormLabel>
//           <Checkbox value="повна">Повна</Checkbox>
//           <Checkbox value="неповна">Неповна</Checkbox>
//         </VStack>
//       </CheckboxGroup>

//       <VStack spacing={2} alignItems="start">
//         <FormLabel margin="0" fontWeight="700">
//           Зарплата
//         </FormLabel>
//         <HStack gap={5}>
//           <FormLabel htmlFor="salary-from" margin="0">
//             від
//           </FormLabel>
//           <NumberInput focusBorderColor="green.600" min={0} id="salary-from" maxWidth="150px">
//             <NumberInputField />
//           </NumberInput>
//         </HStack>
//         <HStack gap={5}>
//           <FormLabel htmlFor="salary-to" margin="0">
//             до
//           </FormLabel>
//           <NumberInput focusBorderColor="green.600" min={0} id="salary-to" maxWidth="150px">
//             <NumberInputField />
//           </NumberInput>
//         </HStack>
//       </VStack>

//       <VStack spacing={2} alignItems="start">
//         <FormLabel margin="0" fontWeight="700">
//           Досвід роботи
//         </FormLabel>
//         <NumberInput focusBorderColor="green.600" min={0} id="experience" maxWidth="150px">
//           <NumberInputField />
//         </NumberInput>
//       </VStack>
//     </Stack>
//   );
// };

// export default VacancyResumeFilters;
