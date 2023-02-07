import { EvilIcons, Feather } from '@expo/vector-icons';
import { View, Text, StyleSheet, Image,  TouchableOpacity } from 'react-native';
const defaultAvatar = require('../../assets/images/avatar.png');


export  const PostsScreenItem = (item, navigation,createLike) => (
    <>
    <View style={styles.authorBox}>
      {item.avatar ?
        <Image source={{ uri: item.avatar }} style={styles.avatarImg} />
        : <Image source={defaultAvatar} style={styles.avatarImg} />}
            <View>
            <Text style={styles.userName}>{item.login}</Text>
            <Text style={styles.userEmail}>{item.email}</Text>
            </View>
          </View>
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
            onPress={()=>createLike(item.id)}
                activeOpacity={0.8}
                style={{ flexDirection: "row", marginRight: 9, alignItems: "flex-end" }}
              >
            <Feather name="thumbs-up" size={24} color="#BDBDBD"
              style={{ marginRight: 6, color: !item?.likes?.length ? '#BDBDBD' : '#FF6C00' }}
            />
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
      </>
)
  const styles = StyleSheet.create({
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
