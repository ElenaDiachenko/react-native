import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View } from 'react-native';
import RegistrationScreen from './src/Screens/RegistrationScreen';
import { useFonts } from 'expo-font';
import { useCallback } from "react";
import * as SplashScreen from 'expo-splash-screen';
const image = require('./assets/images/mountain.jpg')

SplashScreen.preventAutoHideAsync();


export default function App() {
    const [fontsLoaded] = useFonts({
    "Roboto-Regular": require("./assets/fonts/Roboto/Roboto-Regular.ttf"),
    "Roboto-Medium": require("./assets/fonts/Roboto/Roboto-Medium.ttf"),
    "Roboto-Bold": require("./assets/fonts/Roboto/Roboto-Bold.ttf"),
    });
  
 const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }
  return (
    <View style={styles.container} onLayout={onLayoutRootView}>
      <StatusBar style="auto" />
        <RegistrationScreen/>
    </View>
  
  );
}

const styles = StyleSheet.create({
  container: {
     flex: 1,
    // flexDirection: 'column',
    // flex: 1,
   
    // alignItems: 'center',
    // justifyContent: 'center',
  },
    image: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
  },
});
