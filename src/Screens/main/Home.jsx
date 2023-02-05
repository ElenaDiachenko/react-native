import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons, Feather} from "@expo/vector-icons";
import { logoutUser } from '../../redux/auth/authOperations'
import { useDispatch } from "react-redux";
import { TouchableOpacity } from 'react-native';

import HomeScreen from './HomeScreen'
import CreatePostsScreen from './CreatePostsScreen'
import ProfileScreen from './ProfileScreen'

const MainTab = createBottomTabNavigator();

const Home = () => {
  const dispatch = useDispatch()
  return (
    <MainTab.Navigator
      initialRouteName={HomeScreen}
      screenOptions={({ route }) => ({
        tabBarShowLabel: false,
        tabBarHideOnKeyboard:true,
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
          headerTitle: "Профиль",
          headerRight: () => (
            <TouchableOpacity
              style={{ width: 24, marginRight: 16 }}
              onPress={()=>dispatch(logoutUser())}
            >
              <Feather
                name="log-out"
                size={24}
                color="#BDBDBD"
              />
            </TouchableOpacity>
          ),
        }} />
        </MainTab.Navigator>
  )
}


export default Home