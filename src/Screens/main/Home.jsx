import React from "react";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons, Feather} from "@expo/vector-icons";
import { StyleSheet, View, Text } from 'react-native';

import PostsScreen from './PostsScreen'
import CreatePostsScreen from './CreatePostsScreen'
import ProfileScreen from './ProfileScreen'

const MainTab = createBottomTabNavigator();

const Home = () => {
  return (
    <MainTab.Navigator
      screenOptions={({ route }) => ({
        tabBarShowLabel: false,
        tabBarStyle: { backgroundColor: "#ffffff", boxShadow:" 0px -0.5px 0px 0px rgba(0, 0, 0, 0.3)"},
        tabBarInactiveTintColor: "rgba(33, 33, 33, 0.8)",
        tabBarActiveTintColor: "#FF6C00",
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;
            size = 25;

            if (route.name === "Posts") {
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
          boxShadow: "0px 0.5px 0px rgba(0, 0, 0, 0.3)",
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
          <MainTab.Screen  name="Posts"
          component={PostsScreen}
          options={{
            headerTitle: "Публикации",
            headerRight: () => (
              <Feather
                name="log-out"
                size={24}
                color="#BDBDBD"
                onPress={() => {}}
                style={{ marginRight: 16 }}
              />
            ),
          }}/>
          <MainTab.Screen
          name="Create"
          component={CreatePostsScreen}
          options={{ headerTitle: "Создать публикацию" }}/>
          
          <MainTab.Screen name="Profile"
          component={ProfileScreen}
          options={{ headerTitle: "Профиль" }}/>
        </MainTab.Navigator>
  )
}


export default Home