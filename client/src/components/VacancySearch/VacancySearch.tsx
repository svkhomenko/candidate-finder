import { Stack, FormControl, Input, Button } from '@chakra-ui/react';

const styles = {
  button: {
    w: '250px',
  },
};

function VacancySearch() {
  return (
    <Stack
      direction={{ base: 'column', lg: 'row' }}
      spacing="5"
      bgColor="gray.100"
      padding="10px 20px"
      w="100vw"
      alignItems="center"
    >
      <Stack direction={{ base: 'column', lg: 'row' }} w="100%">
        <FormControl>
          <Input id="q" placeholder="Назва посади" bgColor="white" focusBorderColor="green.600" />
        </FormControl>
        <FormControl>
          <Input id="location" placeholder="Місто" bgColor="white" focusBorderColor="green.600" />
        </FormControl>
      </Stack>
      <Button type="submit" colorScheme="green" sx={styles.button}>
        Пошук
      </Button>
    </Stack>
  );
}

export default VacancySearch;
