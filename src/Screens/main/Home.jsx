import React from "react";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { StyleSheet, View, Text } from 'react-native';

import PostsScreen from './PostsScreen'
import CreatePostsScreen from './CreatePostsScreen'
import ProfileScreen from './ProfileScreen'

const MainTab = createBottomTabNavigator();

const Home = () => {
  return (
      <MainTab.Navigator>
          <MainTab.Screen name="Posts" component={PostsScreen}/>
          <MainTab.Screen name="Create" component={CreatePostsScreen}/>
          <MainTab.Screen name="Profile" component={ProfileScreen}/>
        </MainTab.Navigator>
  )
}

const styles = StyleSheet.create({
    container: {
    flex: 1,
    alignItems: "center",
    justifyContent: 'center',
    },
});
export default Home