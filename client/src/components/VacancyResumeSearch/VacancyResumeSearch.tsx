import { Stack, Input, Button } from '@chakra-ui/react';
import { useForm } from 'react-hook-form';
import PlacesSearch from '~/components/PlacesSearch/CitySearch';

export type ISearch = {
  q: string;
};

type IProps = {
  setQ: React.Dispatch<React.SetStateAction<string>>;
  setPlaceId: React.Dispatch<React.SetStateAction<string>>;
};

function VacancyResumeSearch({ setQ, setPlaceId }: IProps) {
  const { register, getValues } = useForm<ISearch>();

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
        <Input
          id="q"
          placeholder="Назва посади"
          bgColor="white"
          focusBorderColor="green.600"
          {...register('q', {
            onBlur: () => {
              setQ(getValues('q'));
            },
          })}
        />
        <PlacesSearch setPlaceId={setPlaceId} />
      </Stack>
      <Button type="submit" colorScheme="green" w="250px">
        Пошук
      </Button>
    </Stack>
  );
}

export default VacancyResumeSearch;
