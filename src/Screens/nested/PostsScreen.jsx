import React, { useState, useEffect } from 'react';
import { EvilIcons, Feather } from '@expo/vector-icons';
import { View, Text, StyleSheet, Image, FlatList ,TouchableOpacity} from 'react-native';
import { db } from '../../firebase/config';
import { collection, onSnapshot, query, orderBy } from 'firebase/firestore';
import { useAuth } from '../../hooks/useAuth';

const defaultAvatar = require('../../../assets/images/avatar.jpg');

export const PostsScreen = ({ navigation }) => {
  const {login,userId,email} = useAuth()
  const [posts, setPosts] = useState([]);

   useEffect(() => {
    (async () => {
    const dbRef = collection(db, "posts");
    onSnapshot(dbRef, (docSnap) =>
      setPosts(docSnap.docs.map((doc) => ({ ...doc.data(), id: doc.id })))
    );
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
                <EvilIcons name="comment" size={30} color="#BDBDBD" style={{marginRight:6,transform: [{rotateY: '180deg'}]}} />
                <Text style={styles.commentsCount}>0</Text>
          </TouchableOpacity>
          {/* <TouchableOpacity
                // onPress={() => navigation.navigate("Comments", {
                //   postId: item.id,
                //   photo:item.photo
                // })}
                activeOpacity={0.8}
                style={{ flexDirection: "row", alignItems: "flex-end" }}
              >
                <Feather name="thumbs-up" size={24} color="#BDBDBD"  />
                <Text style={styles.commentsCount}>0</Text>
              </TouchableOpacity> */}
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
                  color="#BDBDBD"
                  style={{marginRight:6}}
                  /> 
                  </TouchableOpacity>
                <Text style={styles.location}>{item.location}</Text>
              </View>
            </View>
          </View>
  )
    return (
      <View style={styles.container}>
       
          <View style={styles.authorBox}>
            <Image source={defaultAvatar} style={styles.avatarImg} />
            <View>
            <Text style={styles.userName}>{login}</Text>
            <Text style={styles.userEmail}>{email}</Text>
            </View>
          </View>
        <View style={styles.postsContainer}>
          <FlatList
           data={posts}
           keyExtractor={(item) => item.id}
           renderItem={renderItem}
          />
        </View>
        </View>
  )
}

const styles = StyleSheet.create({
    container: {
    flex: 1,
    paddingHorizontal:16,
    justifyContent: "flex-start",
    alignItems:"center",
    backgroundColor: "#ffffff",
  },
  postsContainer: {
    width: "100%",
    marginBottom: 120,
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

