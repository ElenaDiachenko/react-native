import { useState } from 'react';
import {
    StyleSheet,
    View,
    ImageBackground,
    Platform,
    KeyboardAvoidingView,
    TouchableWithoutFeedback,
    Keyboard,
    Image,
} from 'react-native';
const image = require('../../assets/images/auth-bg.jpg')
const plus = require("../../assets/images/add.png");
const avatar = require("../../assets/images/avatar.jpg");
import {Input, Title, Button, Avatar} from '../components'

const RegistrationScreen = () => {
    const [login, setLogin] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPwd, setShowPwd] = useState(true);
    const [isKeyboard, setIsKeyboard] = useState(false);

    const keyboardHide = () => {
        setIsKeyboard(false);
        Keyboard.dismiss()
        console.log(login, email, password)
        setEmail("");
        setPassword("");
        setLogin("");
    }
    
    const onSubmit = () => {
    console.log(login, email, password)
 }
    return (
       <TouchableWithoutFeedback onPress={keyboardHide}>
      <View style={styles.mainContainer}>
        <ImageBackground source={image}  style={styles.imageBg}>
            <KeyboardAvoidingView behavior={Platform.OS == "ios" ? "padding" : "height"}>
                <View style={styles.container}>
                    <Avatar/>
                    <View style={styles.form}>
                        <Title text="Регистрация" />
                        <Input value={login}
                            onChangeText={setLogin}
                            placeholder={"Логин"}
                            setIsKeyboard={setIsKeyboard}
                        />
                        <Input  value={email}
                            onChangeText={setEmail}
                            placeholder={"Адрес электронной почты"}
                            setIsKeyboard={setIsKeyboard}
                            keyboardType='email-address'
                        />
                        <Input value={password}
                            onChangeText={setPassword}
                            placeholder={"Пароль"}
                            secureTextEntry={showPwd} 
                            setIsKeyboard={setIsKeyboard}
                        />
                        <Button text='Зарегистрироваться' onPress={keyboardHide}/>
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
   
});

export default RegistrationScreen