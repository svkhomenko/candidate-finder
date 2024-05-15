import { useState, SyntheticEvent } from 'react';
import { Libraries, useJsApiLoader, Autocomplete, GoogleMap } from '@react-google-maps/api';
import { Input, FormControl, Box } from '@chakra-ui/react';
import { getFormattedAddressWithoutPostalCode } from './helper';
import './style.css';

const libraries: Libraries = ['places'];

type IProps = {
  setPlaceId: React.Dispatch<React.SetStateAction<string>>;
};

function CitySearch({ setPlaceId }: IProps) {
  const [searchBox, setSearchBox] = useState<google.maps.places.Autocomplete>();
  const [address, setAddress] = useState('');

  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAP_API_KEY,
    libraries,
    language: 'uk',
  });

  const handleChangeAddress = (e: SyntheticEvent) => {
    setAddress((e.target as HTMLInputElement).value);
  };

  const onLoad = (ref: google.maps.places.Autocomplete) => {
    setSearchBox(ref);
  };

  const onPlaceChanged = () => {
    let place = searchBox?.getPlace();
    if (place && place.formatted_address) {
      setAddress(getFormattedAddressWithoutPostalCode(place));
      place.place_id && setPlaceId(place.place_id);
    }
  };

  if (!isLoaded) {
    return <></>;
  }

  return (
    <Box sx={{ width: '100%' }} id="box-searchbox-city">
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
              placeholder="Місто"
              bgColor="white"
              focusBorderColor="green.600"
              value={address}
              onChange={handleChangeAddress}
            />
          </FormControl>
        </Autocomplete>
      </GoogleMap>
    </Box>
  );
}

export default CitySearch;
