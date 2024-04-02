import {
  CheckboxGroup,
  Stack,
  VStack,
  HStack,
  Checkbox,
  FormLabel,
  NumberInput,
  NumberInputField,
} from '@chakra-ui/react';

const VacancyFilters = () => {
  return (
    <Stack direction={['column', 'row']} spacing="30px" margin="20px 30px">
      <CheckboxGroup colorScheme="green">
        <VStack spacing={2} alignItems="start">
          <FormLabel htmlFor="contract" margin="0" fontWeight="700">
            Вид зайнятості
          </FormLabel>
          <Checkbox value="повна">Повна</Checkbox>
          <Checkbox value="неповна">Неповна</Checkbox>
        </VStack>
      </CheckboxGroup>

      <VStack spacing={2} alignItems="start">
        <FormLabel margin="0" fontWeight="700">
          Зарплата
        </FormLabel>
        <HStack gap={5}>
          <FormLabel htmlFor="salary-from" margin="0">
            від
          </FormLabel>
          <NumberInput focusBorderColor="green.600" min={0} id="salary-from" maxWidth="150px">
            <NumberInputField />
          </NumberInput>
        </HStack>
        <HStack gap={5}>
          <FormLabel htmlFor="salary-to" margin="0">
            до
          </FormLabel>
          <NumberInput focusBorderColor="green.600" min={0} id="salary-to" maxWidth="150px">
            <NumberInputField />
          </NumberInput>
        </HStack>
      </VStack>

      <VStack spacing={2} alignItems="start">
        <FormLabel margin="0" fontWeight="700">
          Досвід роботи
        </FormLabel>
        <NumberInput focusBorderColor="green.600" min={0} id="experience" maxWidth="150px">
          <NumberInputField />
        </NumberInput>
      </VStack>
    </Stack>
  );
};

export default VacancyFilters;
