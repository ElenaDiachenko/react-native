import React from 'react'
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import RegistrationScreen from './RegistrationScreen';
import LoginScreen from './LoginScreen';

const AuthStack = createNativeStackNavigator();

const Auth = () => {
  return (
    <AuthStack.Navigator
        initialRouteName="Register"
        screenOptions={{
        headerShown: false,
        }}>
          <AuthStack.Screen name="Login" component={LoginScreen} />
          <AuthStack.Screen name="Register" component={RegistrationScreen} />
        </AuthStack.Navigator>
  )
}

export default Auth