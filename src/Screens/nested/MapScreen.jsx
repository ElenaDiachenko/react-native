import MapView, { Marker } from 'react-native-maps';
import { StyleSheet, View} from 'react-native';
import * as Location from 'expo-location';


export const MapScreen = ({ route , navigation}) => {

  const { location: { latitude, longitude }, title, create = false } = route.params;

     const currentRegion = {
          latitude,
          longitude,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
    }
    
 
    const onMapClick = async (event) => {
      const choosenCoords = event.nativeEvent.coordinate;
      const address = await Location.reverseGeocodeAsync(choosenCoords);
      const city = address[0].city;
      const country = address[0].country;
      const place=`${city}, ${country}`

      navigation.navigate("Create", {
        choosenCoords,
        place,
      })
  }

    return (
      <View style={styles.container}>
        <MapView
          onPress={create && onMapClick  }
          style={styles.map}
          initialRegion={currentRegion}
        >
          <Marker
          title={title}
            coordinate={currentRegion}
            pinColor="#FF6C00"
        />
        </MapView>
        </View>
  )
}

const styles = StyleSheet.create({
    container: {
    flex: 1,
    justifyContent: 'center',
  },
  map: {
    flex: 1,
  }
});

