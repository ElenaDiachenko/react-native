import MapView, {Marker} from 'react-native-maps';
import { StyleSheet, View} from 'react-native';

export const MapScreen = ({ route }) => {
const {location:{latitude,longitude}, title}= route.params

    return (
      <View style={styles.container}>
        <MapView
          style={styles.map}
          initialRegion={{
          latitude,
          longitude,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
          }}
        >
          <Marker
          title={title}
          coordinate={{
            latitude,
            longitude,
          }}
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

