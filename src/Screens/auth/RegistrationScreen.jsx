import { useState } from 'react';
import { useDispatch } from 'react-redux';
import {
    StyleSheet,
    View,
    ImageBackground,
    Platform,
    KeyboardAvoidingView,
    TouchableWithoutFeedback,
    Keyboard,
    Text, 
} from 'react-native';
import {registerUser} from '../../redux/auth/authOperations'
import { uploadPhotoToServer } from '../../utils/uploadPhotoToServer';
import { pickImage } from '../../utils/pickImage';
const image = require('../../../assets/images/auth-bg.jpg')
import {Input, Title, Button, Avatar,LinkAuth} from '../../components'

const RegistrationScreen = ({ navigation }) => {
    const dispatch = useDispatch();

    const [loading, setLoading] = useState(false)
    const [avatar,setAvatar] = useState(null)
    const [login, setLogin] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPwd, setShowPwd] = useState(true);
    const [isKeyboard, setIsKeyboard] = useState(false);

    const navigate = () => navigation.navigate('Login')
 
    const keyboardHide = () => {
        setIsKeyboard(false);
        Keyboard.dismiss()
    }
    

      const reset = () => {
        setEmail("");
        setPassword("");
        setLogin("");
        setAvatar("")
    }

    const chooseImage = async () => {
        const imagePath = await pickImage();
        setAvatar(imagePath)
  };
  
    const onSubmit = async() => {
        keyboardHide();
        setLoading(true);
        let photoURL = null;
        if (avatar) {
            photoURL = await uploadPhotoToServer(avatar, 'avatars');
        }
        const credentials = {
            login, 
            email,
            password,
            avatar: photoURL,
        }
      await dispatch(registerUser(credentials))
      setLoading(false)
        reset()
    }

  
    return (
    <TouchableWithoutFeedback onPress={keyboardHide}>
      <View style={styles.mainContainer}>
        <ImageBackground source={image}  style={styles.imageBg}>
            <KeyboardAvoidingView behavior={Platform.OS == "ios" ? "padding" : null}>
                <View style={styles.container}>
                    <Avatar uri={avatar } pickImage={chooseImage}  />
                    <View style={styles.form}>
                        <Title text="Sign Up" />
                        <Input value={login}
                            onChangeText={setLogin}
                            placeholder={"Login"}
                            setIsKeyboard={setIsKeyboard}
                        />
                        <Input  value={email}
                            onChangeText={setEmail}
                            placeholder={"Email adress"}
                            setIsKeyboard={setIsKeyboard}
                            keyboardType='email-address'
                        />
                        <View style={styles.password}>
                        <Input value={password}
                            onChangeText={setPassword}
                            placeholder={"Password"}
                            secureTextEntry={showPwd} 
                            setIsKeyboard={setIsKeyboard}
                        />
                        {password ? <Text onPress={() => { setShowPwd(!showPwd) }} style={styles.text}>{!showPwd?"Hide":"Show" }</Text>:null}
                         </View>           
                        <Button text='Sign Up' onPress={onSubmit } loading={loading}/>
                        <LinkAuth title='Already have an account? Sign In' navigate={navigate} />
                    </View>
                </View>
           </KeyboardAvoidingView>
              </ImageBackground>
              
            </View>
            </TouchableWithoutFeedback>
  );
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
    form: {
        display:"flex",
        width:'100%',
        paddingHorizontal: 16,
        
    },
    password: {
       position:"relative"
    },
    text: {
    position: "absolute",
    top: 13,
    right: 16,
    fontFamily: "Roboto-Regular",
    color: "#1B4371",
    fontSize: 16,
    
  },
});

export default RegistrationScreen