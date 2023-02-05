import React, { useState, useEffect } from 'react';
import { EvilIcons, Feather } from '@expo/vector-icons';
import { View, Text, StyleSheet, Image, FlatList, TouchableOpacity, ImageBackground } from 'react-native';
import { doc, onSnapshot, collection,arrayRemove, setDoc,arrayUnion, getDoc, query, orderBy, where } from 'firebase/firestore';
import { db } from '../../firebase/config';
import { useAuth } from '../../hooks/useAuth';
import {Avatar} from '../../components'

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


  const renderItem = ({ item }) => (
    <View style={styles.contentBox}>
             <Image
              source={{uri:item.photo}}
              style={{ height: 240, borderRadius: 8, marginBottom:8 }}
            />
      <View>
        <Text style={styles.description}>
            {item.description}
            </Text>
            </View>

            <View style={styles.info}>
        <View style={{ flexDirection: "row", alignItems: "flex-end" }}>
          <TouchableOpacity
                onPress={() => navigation.navigate("Comments", {
                  postId: item.id,
                  photo:item.photo
                })}
                activeOpacity={0.8}
                style={{ flexDirection: "row", marginRight: 9, alignItems: "flex-end" }}
              >
                <EvilIcons name="comment" size={30} color="#BDBDBD" style={{marginRight:6, color: !item.commentsCount  ? '#BDBDBD' : '#FF6C00',transform: [{rotateY: '180deg'}]}} />
            <Text style={styles.commentsCount}>{item.commentsCount || 0}</Text>
          </TouchableOpacity>
          <TouchableOpacity
                activeOpacity={0.8}
                style={{ flexDirection: "row", marginRight: 9, alignItems: "flex-end" }}
              >
                <Feather name="thumbs-up" size={24} color="#BDBDBD" style={{marginRight:6, color: !item?.likes?.length  ? '#BDBDBD' : '#FF6C00'}} />
            <Text style={styles.commentsCount}>{item?.likes?.length ||0}</Text>
              </TouchableOpacity>
              </View>
              <View style={{ flexDirection: "row", alignItems: "flex-end" }}>
                <TouchableOpacity
            onPress={() => navigation.navigate("Map", {
              location: item.coords,
              title:item.description
                })}
                activeOpacity={0.8}
                >
                <Feather
                  name="map-pin"
                  size={24}
                  style={{marginRight:6, color: '#BDBDBD' }}
                  /> 
                  </TouchableOpacity>
                <Text style={styles.location}>{item.location}</Text>
              </View>
            </View>
      </View>
  )
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
            renderItem={renderItem}
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
  contentBox: {
    marginBottom: 32,
  },
 
  description: {
    color: "#212121",
    fontFamily: "Roboto-Medium",
    fontSize: 16,
    lineHeight: 19,
    marginBottom:11,
  },
  info: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
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
export default ProfileScreen
