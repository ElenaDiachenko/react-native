import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet,  FlatList,  ImageBackground } from 'react-native';
import {  onSnapshot, collection, query, orderBy, where } from 'firebase/firestore';
import { db } from '../../firebase/config';
import { useAuth } from '../../hooks/useAuth';
import { Avatar,ProfileScreenItem } from '../../components';
const image = require('../../../assets/images/auth-bg.jpg')

 const ProfileScreen  = ({ navigation }) => {
  const {login,avatar, userId} = useAuth()
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    (async () => {
    const q = query(collection(db, 'posts'), where('userId', '==', userId), orderBy('date', 'desc'));
    
    onSnapshot(q, (querySnapshot) => {
      setPosts(querySnapshot.docs.map(doc => ({ ...doc.data(), id: doc.id, })))
    })
  })();
  }, []);


   return (
       <View style={styles.mainContainer}>
        <ImageBackground source={image}  style={styles.imageBg}>
      <View style={styles.container}>
       <Avatar uri={avatar}  />
           <View style={{marginTop:80, marginBottom: 24}}>
             <Text style={styles.profileTitle}>{login }</Text>
          </View>
        <View style={styles.postsContainer}>
          <FlatList
           data={posts}
           keyExtractor={(item) => item.id}
            renderItem={({item})=>ProfileScreenItem(item, navigation)}
          />
        </View>
        </View>
           </ImageBackground>
              
            </View>
  )
}

const styles = StyleSheet.create({
    mainContainer:{flex:1},
    container: {
    position: "relative",
    borderTopRightRadius: 25,
    borderTopLeftRadius: 25,
    width: "100%",
    height: 550,
    flexDirection: "column",
    alignItems: "center",
    backgroundColor: '#FFFFFF',
    },
    imageBg: {
    flex: 1,
    justifyContent: 'flex-end',
    resizeMode:"cover"
    },
  profileTitle: {
    fontFamily: 'Roboto-Medium',
    fontSize: 30,
    lineHeight: 35,
    textAlign: 'center',
    letterSpacing: 0.01,
    color: '#212121',
  },
  postsContainer: {
    width: "100%",
    marginBottom: 120,
    paddingHorizontal: 16,
  },
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
});
export default ProfileScreen
