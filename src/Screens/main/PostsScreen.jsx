import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';

const defaultAvatar = require('../../../assets/images/avatar.jpg');

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
             <Text>
            PostsScreen
          </Text>
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
  contentBox:{}
});

export default PostsScreen