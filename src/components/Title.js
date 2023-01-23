import { StyleSheet, Text } from "react-native";


export const Title = ({text}) => {
  return (
      <Text style={styles.title}>{text}</Text>
  )
}

const styles = StyleSheet.create({
  title: {
   fontFamily: "Roboto-Medium",
    color: '#212121',
    marginTop: 92,
    marginBottom:33,
    fontSize: 30,
  },
});