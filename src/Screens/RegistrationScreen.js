import { useState } from 'react';
import { StyleSheet,  View, ImageBackground } from 'react-native';
const image = require('../../assets/images/auth-bg.jpg')
import {Input, Title, Button} from '../components'

const RegistrationScreen = () => {
    const [showPwd, setShowPwd] = useState(true);

  return (
    <View style={styles.container}>
      <ImageBackground source={image} style={styles.image}>
        <View style={styles.form}>
        <Title text="Регистрация" />
        <Input  placeholder={"Логин"}/>
        <Input  placeholder={"Адрес электронной почты"}/>
        <Input placeholder={"Пароль"} secureTextEntry={showPwd} />
        <Button text='Зарегистрироваться'/>
     </View>
        </ImageBackground>
    </View>
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
    resizeMode: 'cover',
    justifyContent: 'center',
    },
    form: {
        marginHorizontal: 16,
    },
   
});

export default RegistrationScreen