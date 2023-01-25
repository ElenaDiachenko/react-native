import {
    StyleSheet,
    View,
    Image,
} from 'react-native';
const plus = require("../../assets/images/add.png");
const avatar = require("../../assets/images/avatar.jpg");

export const Avatar = () => {
  return (
    <View source={avatar} style={styles.avatarBox}>
        <Image source={avatar} style={styles.avatar} />
        <Image source={plus} style={styles.plus} />
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
    plus: {
    width: 25,
    height: 25,
    position: "absolute",
    bottom: 14,
    right: -12.5,
  },
   
   
});