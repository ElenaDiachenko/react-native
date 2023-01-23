import { StyleSheet, Text, View,ImageBackground } from 'react-native';
const image = require('../../assets/images/auth-bg.jpg')
import {Input} from '../components/Input'

const RegistrationScreen = () => {
  return (
    <View style={styles.container}>
      <ImageBackground source={image} style={styles.image}>
              <View style={styles.form}>
                 <Text style={styles.title}>Регистрация</Text>
                 <Input  placeholder={"Логин"}/>
                  <Input  placeholder={"Адрес электронной почты"}/>
                  <Input  placeholder={"Пароль"} />
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
    input: {
        borderWidth: 1,
        borderColor: '#E8E8E8',
        borderRadius: 8,
        backgroundColor:'#f6f6f6',
        height: 50,
        color: '#bdbdbd',
    },
    title: {
        color: '#212121',
        // fontWeight: "500",
        fontSize:30,
    }
});

export default RegistrationScreen