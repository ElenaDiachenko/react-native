import { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View } from 'react-native';
import { useFonts } from 'expo-font';
import { useCallback } from "react";
import * as SplashScreen from 'expo-splash-screen';
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
  const [isAuth, setIsAuth] = useState(1)

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
      <NavigationContainer>
        {isAuth ? <Home/>:<Auth/>}
      </NavigationContainer>
    </View>
  
  );
}

const styles = StyleSheet.create({
  container: {
     flex: 1,
  },
});

// auth

  