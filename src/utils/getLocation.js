import { useState } from 'react';
import * as Location from 'expo-location';

export const getLocation = async () => {
    
     const {coords} = await Location.getCurrentPositionAsync();
    const address = await Location.reverseGeocodeAsync(coords);
    const city = address[0].city;
    const country = address[0].country;
  
    return {coords, city, country}
}
