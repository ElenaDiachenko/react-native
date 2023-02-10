import React from 'react';
import { useDispatch } from "react-redux";
import { TouchableOpacity } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { CommentsScreen, PostsScreen, MapScreen } from '../nested';
import {  Feather} from "@expo/vector-icons";
import { logoutUser } from '../../redux/auth/authOperations'


const NestedStack = createNativeStackNavigator();

const HomeScreen = () => {
    const dispatch = useDispatch();

   return (
    <NestedStack.Navigator
      initialRouteName={PostsScreen}
      screenOptions={{
        headerTitleAlign: 'center',
          headerTitleStyle: {
          color: "#212121",
          fontFamily: "Roboto-Regular",
          fontSize: 24,
        },
      }}
    >
      <NestedStack.Screen
        name='Posts'
        component={PostsScreen}
        options={{
          title: 'Posts',
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
        }}
      />      
      <NestedStack.Screen
        name='Comments'
        component={CommentsScreen}
        options={{
          title: 'Comments',
        }}
      />
      <NestedStack.Screen
        name='Map'
        component={MapScreen}
        options={{
          title: 'Map',
        }}
      />
    </NestedStack.Navigator>
  )
}


export default HomeScreen