import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View } from 'react-native';
import RegistrationScreen from './src/Screens/auth/RegistrationScreen';
import LoginScreen from './src/Screens/auth/LoginScreen';
import { useFonts } from 'expo-font';
import { useCallback } from "react";
import * as SplashScreen from 'expo-splash-screen';

import PostsScreen from './src/Screens/main/PostsScreen'
import CreatePostsScreen from './src/Screens/main/CreatePostsScreen'
import ProfileScreen from './src/Screens/main/ProfileScreen'

import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';


SplashScreen.preventAutoHideAsync();

const AuthStack = createNativeStackNavigator();

const MainTab = createBottomTabNavigator();


const useRoute = (isAuth) => {
  if(!isAuth){
    return <AuthStack.Navigator
        initialRouteName="Register"
        screenOptions={{
        headerShown: false,
        }}>
          <AuthStack.Screen name="Login" component={LoginScreen} />
          <AuthStack.Screen name="Register" component={RegistrationScreen} />
        </AuthStack.Navigator>
  }
  return <MainTab.Navigator>
          <MainTab.Screen name="Posts" component={PostsScreen}/>
          <MainTab.Screen name="Create" component={CreatePostsScreen}/>
          <MainTab.Screen name="Profile" component={ProfileScreen}/>
        </MainTab.Navigator>
}
export default function App() {
    const [fontsLoaded] = useFonts({
    "Roboto-Regular": require("./assets/fonts/Roboto/Roboto-Regular.ttf"),
    "Roboto-Medium": require("./assets/fonts/Roboto/Roboto-Medium.ttf"),
    "Roboto-Bold": require("./assets/fonts/Roboto/Roboto-Bold.ttf"),
    });
  const routing = useRoute(null)
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
      { routing}
      </NavigationContainer>
        {/* <RegistrationScreen/> */}
        {/* <LoginScreen/> */}
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
});

// auth

  