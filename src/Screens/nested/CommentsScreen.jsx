import React, { useState, useEffect } from "react";
import {
  Image,
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
  Platform,
  FlatList,
  Alert,
} from "react-native";
import { useAuth } from "../../hooks/useAuth";
const defaultAvatar = require('../../../assets/images/avatar.jpg');
import { AntDesign } from '@expo/vector-icons';

export const CommentsScreen = ({ route }) => {
  const { postId, photo } = route.params;
  const { login } = useAuth();
  const [comment, setComment] = useState('');
  const [comments, setComments] = useState([]);
  const [isKeyboard, setIsKeyboard] = useState(false);
  
 const onFocusCommentInput = () => {
    setIsKeyboard(true);
    // setFocusCommentInput(true);
  }
  const onBlurCommentInput = () => {
    setIsKeyboard(false);
    // setFocusCommentInput(false);
  }

  const keyboardHide = () => {
    setIsKeyboard(false);
    Keyboard.dismiss();
  };


  return (
    <TouchableWithoutFeedback onPress={keyboardHide}>
      <View
        style={styles.container}
      >
          <Image
          source={{ uri: photo }}
          style={styles.preview}
        /> 
        <View>

          {/* comment */}
          
          <View
          style={{
          marginTop: 32,
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems:"flex-start"
          }}
          >
            <Image source={defaultAvatar} style={styles.avatarImg} />
              <View style={styles.comment}>
                <Text style={{lineHeight: 18, fontSize:13, color:"#212121"}}>Comment</Text>
                <View>
                  <Text style={styles.date}>
                  03.05.2022
                  </Text>
                </View>
              </View>
             
          </View>
          {/* comment */}
          <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
          >
            <View style={styles.form} >
              <TextInput
                value={comment}
               onChangeText={setComment}
                placeholder='Комментировать...'
                 placeholderTextColor='#BDBDBD'
                onFocus={onFocusCommentInput}
                onBlur={onBlurCommentInput}
                style={styles.input}
                multiline={true}
              />

              <TouchableOpacity
                onPress={() => { }}
                 style={styles.button}
                activeOpacity={0.8}
              >
                <AntDesign name='arrowup' size={20} color='#ffffff' />
              </TouchableOpacity>
            </View>
          </KeyboardAvoidingView>
        </View>
      </View>
      </TouchableWithoutFeedback>
  )
}

const styles = StyleSheet.create({
    container: {
    flex:1,
    backgroundColor:"#ffffff",
    justifyContent: "flex-start",
    paddingHorizontal: 16,
  },
  
   preview: {
    height: 240,
    borderRadius: 8,
    width: "100%",
    marginTop: 32,
  },
   avatarImg: {
    borderRadius: 16,
    width: 38,
    height: 38,
  },
  comment: {
    marginLeft: 16,
    marginBottom: 24,
    flexGrow:1,
    borderWidth: 1,
    padding:16,
    borderRadius: 8,
    borderColor: "rgba(0, 0, 0, 0.03)",
    backgroundColor: "rgba(0, 0, 0, 0.03)",
  },
  date: {
    fontSize: 10,
    lineHeight: 12,
    textAlign: "right",
    color: "#BDBDBD",
  },
   form: {
    justifyContent: 'center',
    backgroundColor: '#F6F6F6',
    borderColor: '#E8E8E8',
    borderRadius: 100,
    borderWidth: 1,
    padding: 16,
  },
  
  input: {
    marginRight: 40,
    fontFamily: "Roboto-Regular",
    fontSize: 16,
    lineHeight:20
  },
    button: {
    position: 'absolute',
    right: 8,
    borderRadius: 50,
    backgroundColor: '#FF6C00',
    width: 34,
    height: 34,
    alignItems: 'center',
    justifyContent: 'center'
    }
});

