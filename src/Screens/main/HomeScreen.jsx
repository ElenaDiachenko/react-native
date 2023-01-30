import React from 'react';
import { TouchableOpacity } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { CommentsScreen, PostsScreen, MapScreen } from '../nested';
import {  Feather} from "@expo/vector-icons";

const NestedStack = createNativeStackNavigator();

const HomeScreen = () => {
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
          title: 'Публикации',
          headerRight: () => (
            <TouchableOpacity
              style={{ width: 24, marginRight: 16 }}
              onPress={()=>{}}
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
          title: 'Комментарии',
        }}
      />
      <NestedStack.Screen
        name='Map'
        component={MapScreen}
        options={{
          title: 'Карта',
        }}
      />
    </NestedStack.Navigator>
  )
}


export default HomeScreen