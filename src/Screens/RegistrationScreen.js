import { useState } from 'react';
import {
    StyleSheet,
    View,
    ImageBackground,
    Platform,
    KeyboardAvoidingView,
    TouchableWithoutFeedback,
    Keyboard,
} from 'react-native';
const image = require('../../assets/images/auth-bg.jpg')
import {Input, Title, Button} from '../components'

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
      <View style={styles.container}>
         
        <ImageBackground source={image}  style={styles.image}>
            <KeyboardAvoidingView behavior={Platform.OS == "ios" ? "padding" : "height"}>
                <View style={{...styles.form, marginBottom: isKeyboard ? 32 : 78}}>
                    
                    <Title text="Регистрация" />
                    <Input  value={login}
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
                        
           </KeyboardAvoidingView>
              </ImageBackground>
              
            </View>
            </TouchableWithoutFeedback>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#212121',
    // flexDirection: 'column',
    },
    image: {
    flex: 1,
    justifyContent: 'flex-end',
    resizeMode:"cover"
    },
    form: {
        marginHorizontal: 16,
    },
   
});

export default RegistrationScreen