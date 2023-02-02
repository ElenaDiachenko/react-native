import React, { useState, useEffect } from "react";
import {
  Image,
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Keyboard,
  FlatList,
  Alert,
} from "react-native";
import { useAuth } from "../../hooks/useAuth";
const defaultAvatar = require('../../../assets/images/avatar.jpg');


export const CommentsScreen = ({ route }) => {
  const { postId, photo } = route.params;
  const { login } = useAuth();
  const [comment, setComment] = useState('');
  const [comments, setComments] = useState([]);
  const [isKeyboard, setIsKeyboard] = useState(false);
  

  const keyboardHide = () => {
    setIsKeyboard(false);
    Keyboard.dismiss();
  };


  return (
    <TouchableWithoutFeedback onPress={keyboardHide}>
      <View
      style={{ ...styles.container, marginBottom: isKeyboard ? 320 : 30 }}
      >
          <Image
          source={{ uri: photo }}
          style={styles.preview}
        /> 
      </View>
    </TouchableWithoutFeedback>
  )
}

const styles = StyleSheet.create({
    container: {
    flex: 1,
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingTop: 32,
    paddingBottom: 32,
  },
   preview: {
    height: 240,
    borderRadius: 8,
    width: "100%"
  },
   avatarImg: {
    borderRadius: 16,
    width: 60,
    height: 60,
    marginRight: 8,
  },
});

