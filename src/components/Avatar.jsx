import {
    StyleSheet,
    View,
    Image,
    TouchableOpacity
} from 'react-native';
const plus = require("../../assets/images/add.png");

export const Avatar = ({uri, pickImage}) => {
  return (
    <View style={styles.avatarBox}>
      {uri?<Image source={{ uri }} style={styles.avatar} />:null}
      <TouchableOpacity
        style={styles.plusBox}
        onPress={()=>pickImage()}
      >
        <Image source={plus} style={styles.plus}  />
      </TouchableOpacity>
      
    </View>  )
}

const styles = StyleSheet.create({
    avatarBox: {
    height: 120,
    width: 120,
    backgroundColor: "#F6F6F6",
    borderRadius: 16,
    position: "absolute",
    top: -60,
    alignSelf: "center",
    },
    avatar: {
    height: 120,
    width: 120,
    borderRadius: 16,
    resizeMode:"cover",
  },
  plusBox: {
          position: "absolute",
    bottom: 14,
    right: -12.5,

    },
    plus: {
    width: 25,
    height: 25,
    // position: "absolute",
    // bottom: 14,
    // right: -12.5,
  },
   
   
});