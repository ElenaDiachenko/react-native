import React, { useState, useEffect } from 'react';
import { EvilIcons, Feather } from '@expo/vector-icons';
import { View, Text, StyleSheet, Image, FlatList ,TouchableOpacity} from 'react-native';

const defaultAvatar = require('../../../assets/images/avatar.jpg');
const initPhoto = require('../../../assets/images/forrest.jpg');

const DefaultPostsScreen = ({ navigation, route }) => {
  const [posts, setPosts] = useState([]);

  // useEffect(() => {
  //     setPosts(prev=>[...prev, route.params])
  //  }, [route.params])
  
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
              source={posts.length ? posts[0] : initPhoto}
              style={{ height: 240, borderRadius: 8, marginBottom:8 }}
            />
            <Text style={styles.description}>
            Forrest
            </Text>

            <View style={styles.info}>
              <TouchableOpacity
                // onPress={() => navigation.navigate("Comments")}
                activeOpacity={0.8}
                style={{ flexDirection: "row", marginRight: 58, alignItems: "flex-end" }}
              >
                <EvilIcons name="comment" size={29} color="#BDBDBD" style={{marginRight:6}} />
                <Text style={styles.commentsCount}>0</Text>
              </TouchableOpacity>
              <View style={{ flexDirection: "row", alignItems: "flex-end" }}>
                <TouchableOpacity
                // onPress={() => navigation.navigate("Comments")}
                activeOpacity={0.8}
                >
                <Feather
                  name="map-pin"
                  size={24}
                  color="#BDBDBD"
                  style={{marginRight:6}}
                  /> 
                  </TouchableOpacity>
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
    alignItems:"center",
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
  info: {
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

export default DefaultPostsScreen