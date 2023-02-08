import {
  ActivityIndicator,
  StyleSheet,
  View,
} from 'react-native';


export const Loader = ({size ="large"}) => {
 return (
    <View style={styles.indicatorWrapper }>
         <ActivityIndicator size={size} color = "#FF6C00" />
     </View>
 )
}


const styles = StyleSheet.create({
  indicatorWrapper: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#ffffff',
  },
});