import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View, LogBox } from 'react-native';
import { useFonts } from 'expo-font';
import { useCallback } from "react";
import * as SplashScreen from 'expo-splash-screen';
import { Provider } from 'react-redux';
import {store} from './src/redux/store'
import {Navigation} from './src/navigation'

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
  console.log(store.getState())
    LogBox.ignoreLogs(['AsyncStorage has been extracted from react-native core']);
  return (
    <Provider store={store}>
      <View style={styles.container} onLayout={onLayoutRootView}>
      <StatusBar style="auto" />
      <Navigation/>
    </View>
    </Provider>
  
  );
}

const styles = StyleSheet.create({
  container: {
     flex: 1,
  },
});


  