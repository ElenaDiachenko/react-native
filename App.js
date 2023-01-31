import { useState } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View } from 'react-native';
import { useFonts } from 'expo-font';
import { useCallback } from "react";
import * as SplashScreen from 'expo-splash-screen';
import { Provider } from 'react-redux';
import {store} from './src/redux/store'
import Home from './src/Screens/main/Home';
import Auth from './src/Screens/auth/Auth';


import { NavigationContainer } from "@react-navigation/native";


SplashScreen.preventAutoHideAsync();



export default function App() {
    const [fontsLoaded] = useFonts({
    "Roboto-Regular": require("./assets/fonts/Roboto/Roboto-Regular.ttf"),
    "Roboto-Medium": require("./assets/fonts/Roboto/Roboto-Medium.ttf"),
    "Roboto-Bold": require("./assets/fonts/Roboto/Roboto-Bold.ttf"),
    });
  const [isAuth, setIsAuth] = useState(null)

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }
  console.log(store.getState())
  return (
    <Provider store={store}>
      <View style={styles.container} onLayout={onLayoutRootView}>
      <StatusBar style="auto" />
      <NavigationContainer>
        {isAuth ? <Home/>:<Auth/>}
      </NavigationContainer>
    </View>
    </Provider>
  
  );
}

const styles = StyleSheet.create({
  container: {
     flex: 1,
  },
});


  