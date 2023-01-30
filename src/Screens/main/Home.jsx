import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons, Feather} from "@expo/vector-icons";
import { StyleSheet, View, Text } from 'react-native';

import HomeScreen from './HomeScreen'
import CreatePostsScreen from './CreatePostsScreen'
import ProfileScreen from './ProfileScreen'

const MainTab = createBottomTabNavigator();

const Home = () => {
  return (
    <MainTab.Navigator
      initialRouteName={HomeScreen}
      screenOptions={({ route }) => ({
        tabBarShowLabel: false,
        tabBarStyle: {
          backgroundColor: "#ffffff",
          shadowColor: "#000000",
          shadowOffset: { width: 0, height: -0.5 },
          shadowOpacity: 0.3,},
        tabBarInactiveTintColor: "rgba(33, 33, 33, 0.8)",
        tabBarActiveTintColor: "#FF6C00",
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;
            size = 25;

            if (route.name === "Home") {
             iconName = focused
                ? 'grid'
                : 'grid-outline';
            } else if (route.name === "Create") {
               iconName = focused
                ? 'add-circle'
                : 'add-circle-outline';
              size = 40;
            } else if (route.name === "Profile") {
               iconName = focused
                ? 'person'
                : 'person-outline';
            }

            return <Ionicons name={iconName} size={size} color={color} />;
        },
          headerStyle: {
          backgroundColor: "#ffffff",
          shadowColor: "#000000",
          shadowOffset: { width: 0, height: -0.5 },
          shadowOpacity: 0.3,
        },
        headerTitleAlign: "center",
        headerTitleStyle: {
          color: "#212121",
          fontFamily: "Roboto-Regular",
          fontSize: 24,
        },
        headerPressColor: "#4169e1",
        })}
    
    >
        <MainTab.Screen  name="Home"
        component={HomeScreen}
        options={{
            headerShown:false
        }}
      />
          <MainTab.Screen
          name="Create"
          component={CreatePostsScreen}
          options={{ headerTitle: "Создать публикацию" }}/>
          
          <MainTab.Screen name="Profile"
          component={ProfileScreen}
          options={{ 
            headerTitle: "Профиль" }}/>
        </MainTab.Navigator>
  )
}


export default Home