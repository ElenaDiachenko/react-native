import { StyleSheet, Text, TouchableOpacity } from "react-native";

export const LinkAuth = ({navigate,title}) => {
    return (
       <TouchableOpacity
              style={styles.button}
              activeOpacity={0.8}
              onPress={navigate}
            >
            <Text style={styles.text}>{title}</Text>
            </TouchableOpacity>
      
  )
}

const styles = StyleSheet.create({
  button: {
    alignItems: "center",
    },
    text: {
    fontFamily: "Roboto-Regular",
    fontSize: 16,
    color: "#1B4371",
    }
});
