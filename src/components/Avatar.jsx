import {
    StyleSheet,
    View,
    Image,
    TouchableOpacity
} from 'react-native';
const plus = require("../../assets/images/add.png");
import { Loader } from './Loader';

export const Avatar = ({ uri, pickImage, button, loadingAvatar }) => {

  return (
    <>
    { loadingAvatar ? <Loader size='small'/> : (
      <View style={styles.avatarBox}>
      {uri ?<Image source={{ uri }} style={styles.avatar} />:null}
      <TouchableOpacity
        style={button ? styles.checkBox : styles.plusBox}
        onPress={()=>pickImage()}
      >
        {button ? button : <Image source={plus} style={styles.plus}  />}
      </TouchableOpacity>
      
    </View>
   )}</>
  )
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
  checkBox: {
    position: "absolute",
    bottom: 14,
    right: -12.5,
    borderColor: "#FF6C00",
    borderWidth: 1,
    borderRadius:50,
    justifyContent: 'center',
    alignItems: 'center',
    padding:1,
    backgroundColor:"#ffffff"
    },
    plus: {
    width: 27,
    height: 27,
  },
   
   
});