import { Input, FormControl, Box, FormLabel, FormErrorMessage } from '@chakra-ui/react';
import { useState, SyntheticEvent } from 'react';
import { Libraries, useJsApiLoader, Autocomplete, GoogleMap } from '@react-google-maps/api';
import { getFormattedAddressWithoutPostalCode } from './helper';
import type { FieldErrors, UseFormSetValue } from 'react-hook-form';
import type { ICreate as ICreateResume } from '~/validation/resumes';
import type { ICreate as ICreateVacancy } from '~/validation/vacancies';
import './style.css';

const libraries: Libraries = ['places'];

type IProps = {
  errors: FieldErrors<ICreateResume> | FieldErrors<ICreateResume>;
  setValue: UseFormSetValue<ICreateVacancy> | UseFormSetValue<ICreateVacancy>;
  storedAddress?: string;
};

function LocationInput({ errors, setValue, storedAddress }: IProps) {
  const [searchBox, setSearchBox] = useState<google.maps.places.Autocomplete>();
  const [address, setAddress] = useState(storedAddress ? storedAddress : '');

  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAP_API_KEY,
    libraries,
    language: 'uk',
  });

  const handleChangeAddress = (e: SyntheticEvent) => {
    setAddress((e.target as HTMLInputElement).value);
    setValue('place_id', '', { shouldValidate: true });
  };

  const onLoad = (ref: google.maps.places.Autocomplete) => {
    setSearchBox(ref);
  };

  const onPlaceChanged = () => {
    let place = searchBox?.getPlace();
    if (place && place.formatted_address && place.place_id) {
      let address = getFormattedAddressWithoutPostalCode(place);
      setAddress(address);

      setValue('place_id', place.place_id, { shouldValidate: true });
      setValue('address', address, { shouldValidate: true });
    }
  };

  if (!isLoaded) {
    return <></>;
  }

  return (
    <Box sx={{ width: '100%' }} id="box-searchbox-city">
      <FormControl isInvalid={!!errors.place_id}>
        <FormLabel htmlFor="title">Місто</FormLabel>

        <GoogleMap id="searchbox-city" zoom={2.5}>
          <Autocomplete
            onLoad={onLoad}
            onPlaceChanged={onPlaceChanged}
            types={['locality']}
            fields={['address_components', 'formatted_address', 'place_id', 'types']}
          >
            <FormControl>
              <Input
                id="location"
                placeholder="місто"
                bgColor="white"
                focusBorderColor="green.600"
                value={address}
                onChange={handleChangeAddress}
              />
            </FormControl>
          </Autocomplete>
        </GoogleMap>

        <FormErrorMessage>Input city</FormErrorMessage>
      </FormControl>
    </Box>
  );
}

export default LocationInput;
