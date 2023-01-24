import { StyleSheet, Text, TouchableOpacity } from 'react-native';


export const Button = ({text, onClick}) => {
  return (
      <TouchableOpacity activeOpacity={0.8} style={styles.btn} onPress={()=>onClick()}>
        <Text style={styles.titleBtn}>{text}</Text>
      </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  btn: {
    height: 50,
    borderRadius: 100,
    marginTop: 27,
    marginBottom: 16,
    backgroundColor:'#FF6C00',
    justifyContent: 'center',
    alignItems:'center'
    },
    titleBtn: {
    fontFamily: "Roboto-Regular",
    fontSize: 16,
    color: "#ffffff",
    }
});