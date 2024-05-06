import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Heading,
  FormControl,
  // FormErrorMessage,
  FormLabel,
  Input,
  VStack,
  Flex,
  Textarea,
  NumberInput,
  NumberInputField,
  CheckboxGroup,
  Checkbox,
} from '@chakra-ui/react';
import CustomSelect from '~/components/Select/CustomSelect';
import styles from '../vacancy-form.styles';
import layoutStyles from '~/components/Layout/layout.styles';
import educationOptions from './education-options';

const VacancyCreateForm = () => {
  return (
    <Flex justify="center" align="flex-start" sx={layoutStyles.page}>
      <Card sx={styles.card} variant="outline">
        <CardHeader>
          <Heading sx={styles.heading}>Створити вакансію</Heading>
        </CardHeader>

        <CardBody>
          <form>
            <VStack spacing="4">
              <FormControl isRequired>
                <FormLabel htmlFor="title">Назва посади</FormLabel>
                <Input focusBorderColor="green.600" id="title" placeholder="назва посади" />
              </FormControl>
              <FormControl isRequired>
                <FormLabel htmlFor="description">Опис посади</FormLabel>
                <Textarea focusBorderColor="green.600" id="description" placeholder="опис посади" />
              </FormControl>
              <FormControl isRequired>
                <FormLabel>Зарплата ₴</FormLabel>
                <NumberInput focusBorderColor="green.600" min={0} id="salary-to">
                  <NumberInputField />
                </NumberInput>
              </FormControl>
              <FormControl isRequired>
                <FormLabel htmlFor="experience">Роки досвіду роботи</FormLabel>
                <NumberInput focusBorderColor="green.600" min={0} id="experience">
                  <NumberInputField />
                </NumberInput>
              </FormControl>
              <FormControl isRequired>
                <FormLabel htmlFor="education">Рівень освіти</FormLabel>
                <CustomSelect options={educationOptions} placeholder="обрати рівень освіти" id="education" />
              </FormControl>
              <FormControl isRequired>
                <FormLabel htmlFor="location">Адреса</FormLabel>
                <Input id="location" placeholder="адреса" focusBorderColor="green.600" />
                <Checkbox value="remote" id="remote" marginTop="10px">
                  Віддалена робота
                </Checkbox>
              </FormControl>
              <FormControl isRequired>
                <CheckboxGroup colorScheme="green">
                  <VStack spacing={2} alignItems="start">
                    <FormLabel htmlFor="contract" margin="0">
                      Вид зайнятості
                    </FormLabel>
                    <Checkbox value="повна">Повна</Checkbox>
                    <Checkbox value="неповна">Неповна</Checkbox>
                  </VStack>
                </CheckboxGroup>
              </FormControl>
              <Button type="submit" w="200px" colorScheme="green">
                Створити
              </Button>
            </VStack>
          </form>
        </CardBody>
      </Card>
    </Flex>
  );
};

export default VacancyCreateForm;
