import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { EvilIcons, Feather } from '@expo/vector-icons';


 export const ProfileScreenItem = (item, navigation, deletePost) => (
    <View style={styles.contentBox}>
     <View style={{position:"relative"}}>
          <Image
              source={{uri:item.photo}}
              style={{ height: 240, borderRadius: 8, marginBottom:8 }}
       />
     <TouchableOpacity
                style={styles.deletePostBtn}
                onPress={() => deletePost(item.id, item.photo)}
                activeOpacity={0.8}
              >
                <Feather name="trash-2" size={25} color='#ffffff' />
              </TouchableOpacity>
      </View>
     <View >
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

  const styles = StyleSheet.create({
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
    },
    deletePostBtn: {
    position: 'absolute',
    top: 10,
    right: 10,
    zIndex: 100,
    width: 40,
    height:40,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: "rgba(255, 255, 255, 0.3)",
    borderRadius: 50,
  },
});

