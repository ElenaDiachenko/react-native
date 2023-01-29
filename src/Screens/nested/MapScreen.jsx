import MapView, {Marker} from 'react-native-maps';
import { StyleSheet, View} from 'react-native';

const MapScreen = () => {
    return (
      <View style={styles.container}>
        <MapView
          style={styles.map}
          initialRegion={{
          latitude: 55.6695966,
          longitude: 21.2019448,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
          }}
        >
          <Marker
          title="here"
          coordinate={{
            latitude: 55.6695966,
            longitude: 21.2019448,
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

export default MapScreen