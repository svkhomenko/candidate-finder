function getFormattedAddressWithoutPostalCode(place: google.maps.places.PlaceResult) {
  if (place && place.formatted_address && place.address_components) {
    let postal_code = place.address_components.find((component) => component.types.includes('postal_code'));
    if (postal_code && postal_code.long_name) {
      let reqex = new RegExp(`,?\\s?${postal_code.long_name}`, 'gi');
      return place.formatted_address.replace(reqex, '');
    }
    return place.formatted_address;
  }
  return '';
}

export { getFormattedAddressWithoutPostalCode };
