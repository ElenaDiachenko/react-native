import React, { useState, useEffect } from 'react';
import { EvilIcons, Feather } from '@expo/vector-icons';
import { View, Text, StyleSheet, Image, FlatList } from 'react-native';

const defaultAvatar = require('../../../assets/images/avatar.jpg');
const initPhoto = require('../../../assets/images/forrest.jpg');

const PostsScreen = ({ navigation, route }) => {
    return (
      <View style={styles.container}>
        <View style={styles.postBox}>
          <View style={styles.authorBox}>
            <Image source={defaultAvatar} style={styles.avatarImg} />
            <View>
              <Text style={styles.userName}>userName</Text>
              <Text style={styles.userEmail}>userEmail</Text>
            </View>
          </View>
          <View style={styles.contentBox}>
             <Image
              source={initPhoto}
              style={{ height: 240, borderRadius: 8, marginBottom:8 }}
            />
            <Text style={styles.description}>
            PostsScreen
            </Text>
            <View style={styles.comments}>
              <View style={{flexDirection:"row", marginRight: 58, alignItems:"flex-end"}}>
                <EvilIcons name="comment" size={29} color="#BDBDBD" style={{marginRight:6}} />
                <Text style={styles.commentsCount}>0</Text>
              </View>
              <View style={{flexDirection:"row", alignItems:"flex-end"}}>
                <Feather
                  name="map-pin"
                  size={24}
                  color="#BDBDBD"
                  style={{marginRight:6}}
                /> 
                <Text style={styles.location}>Location gfhjkhjghg</Text>
              </View>
            </View>
          </View>
        </View>
         
        </View>
  )
}

const styles = StyleSheet.create({
    container: {
    flex: 1,
    paddingHorizontal:16,
    justifyContent: "flex-start",
    backgroundColor: "#ffffff",
  },
  postBox:{},
  authorBox: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 32,
    marginBottom: 32,
    marginRight: 'auto'
  },
  avatarImg: {
    borderRadius: 16,
    width: 60,
    height: 60,
    marginRight: 8,
  },
  userName: {
    fontFamily: 'Roboto-Bold',
    fontSize: 13,
    lineHeight: 15,
    color: '#212121',
  },
  userEmail: {
    fontFamily: 'Roboto-Regular',
    fontSize: 11,
    lineHeight: 13,
    color: '#21212180'
  },
  contentBox: {
  },
 
  description: {
    color: "#212121",
    fontFamily: "Roboto-Medium",
    fontSize: 16,
    lineHeight: 19,
    marginBottom:11,
  },
  comments: {
    flexDirection: "row",
    alignItems: "center",
    marginRight: "auto",
  },
  commentsCount: {
    color: "#BDBDBD",
    fontFamily: "Roboto-Regular",
    fontSize: 16,
    lineHeight: 19,
  },
  location: {
    color: "#212121",
    fontFamily: "Roboto-Regular",
    fontSize: 16,
    lineHeight: 19,
    textDecorationLine: "underline",
    marginLeft: 4,
  }
});

export default PostsScreen