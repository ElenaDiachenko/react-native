import { useState } from 'react';
import {
    StyleSheet,
    View,
    ImageBackground,
    Platform,
    KeyboardAvoidingView,
    TouchableWithoutFeedback,
    Keyboard
} from 'react-native';
const image = require('../../assets/images/auth-bg.jpg')
import {Input, Title, Button} from '../components'

const RegistrationScreen = () => {
    const [showPwd, setShowPwd] = useState(true);
    const [isFocused, setIsFocused] = useState(false);

    const keyboardHide = () => {
        setIsFocused(false);
        Keyboard.dismiss()
        
}

    return (
       <TouchableWithoutFeedback onPress={keyboardHide}>
      <View style={styles.container}>
         
        <ImageBackground source={image} resizeMode="cover" style={styles.image}>
            <KeyboardAvoidingView behavior={Platform.OS == "ios" ? "padding" : "height"}>
                <View style={{...styles.form, marginBottom: isFocused ? 32 : 78}}>
                    <Title text="Регистрация" />
                    <Input  placeholder={"Логин"} isFocused={isFocused} setIsFocused={setIsFocused}/>
                    <Input  placeholder={"Адрес электронной почты"} isFocused={isFocused} setIsFocused={setIsFocused}/>
                    <Input placeholder={"Пароль"} secureTextEntry={showPwd} isFocused={isFocused} setIsFocused={setIsFocused} />
                    <Button text='Зарегистрироваться' onClick={keyboardHide}/>
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
    flexDirection: 'column',
    },
    image: {
    flex: 1,
    justifyContent: 'flex-end',
    
    },
    form: {
        marginHorizontal: 16,
    },
   
});

export default RegistrationScreen