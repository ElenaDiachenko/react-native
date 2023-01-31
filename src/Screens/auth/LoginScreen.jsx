import { useState } from 'react';
import { useDispatch } from 'react-redux';
import {loginUser} from '../../redux/auth/authOperations'
import {
    StyleSheet,
    View,
    ImageBackground,
    Platform,
    KeyboardAvoidingView,
    TouchableWithoutFeedback,
    Keyboard,
    Text
} from 'react-native';

const image = require('../../../assets/images/auth-bg.jpg')
import {Input, Title, Button,  LinkAuth} from '../../components'

const LoginScreen = ({ navigation }) => {
    const dispatch= useDispatch()
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPwd, setShowPwd] = useState(true);
    const [isKeyboard, setIsKeyboard] = useState(false);

     const navigate = () => navigation.navigate('Register')
    const keyboardHide = () => {
        setIsKeyboard(false);
        Keyboard.dismiss()
    }
      const reset = () => {
        setEmail("");
        setPassword("");
        setLogin("");
    }

    const onSubmit = async() => {
        keyboardHide();
        const credentials = {
            email,
            password
        }
        await dispatch(loginUser(credentials))
        // reset()
    }

    return (
       <TouchableWithoutFeedback onPress={keyboardHide}>
      <View style={styles.mainContainer}>
        <ImageBackground source={image}  style={styles.imageBg}>
            <KeyboardAvoidingView behavior={Platform.OS == "ios" ? "padding" : "height"}>
                <View style={styles.container}>
                   
                    <View style={styles.form}>
                        <Title text="Войти" />
                        <Input  value={email}
                            onChangeText={setEmail}
                            placeholder={"Адрес электронной почты"}
                            setIsKeyboard={setIsKeyboard}
                            keyboardType='email-address'
                        />
                        <View style={styles.password}>
                        <Input value={password}
                            onChangeText={setPassword}
                            placeholder={"Пароль"}
                            secureTextEntry={showPwd} 
                            setIsKeyboard={setIsKeyboard}
                        />
                        <Text onPress={() => { setShowPwd(!showPwd) }} style={styles.text}>{!showPwd?"Скрыть":"Показать" }</Text>
                         </View>           
                        <Button text='Войти' onPress={onSubmit} />
                        <LinkAuth title='Нет аккаунта? Зарегистрироваться' navigate={navigate}/>
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
    borderTopRightRadius: 25,
    borderTopLeftRadius: 25,
    width: "100%",
    height: 490,
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

export default LoginScreen;