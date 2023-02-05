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
import { doc, onSnapshot, addDoc,collection, setDoc } from 'firebase/firestore';
import { db } from '../../firebase/config';
import { useAuth } from "../../hooks/useAuth";
const defaultAvatar = require('../../../assets/images/avatar.png');
import { AntDesign } from '@expo/vector-icons';


export const CommentsScreen = ({ route }) => {
  const { postId, photo } = route.params;
  const { login, userId, avatar } = useAuth();
  const [comment, setComment] = useState('');
  const [comments, setComments] = useState([]);
  const [isKeyboard, setIsKeyboard] = useState(false);
  const [loading, setLoading] = useState(false);
  const [focusCommentInput, setFocusCommentInput] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        setLoading(true)
        const dbRef = doc(db, "posts", postId);
        onSnapshot(collection(dbRef, "comments"), (docSnap) =>
          setComments(docSnap.docs.map((doc) => ({ ...doc.data(), id: doc.id })))
        );
        setLoading(false)
      } catch (error) {
        setLoading(false)
      }
    })();
  }, []);

  const createComment = async () => {
    if (!comment.trim()) {
      Alert.alert(`Please, add comment.`);
      return
    };
    const date = new Date().toLocaleDateString();
    const time = new Date().toLocaleTimeString();
    
    try {
      const docRef = doc(db, 'posts', postId)
      await addDoc(collection(docRef, "comments"), {
        comment,
        userId,
        login,
        date,
        time,
      });
      await setDoc(docRef, {
        commentsCount:comments.length+1
      }, { merge: true })
      setComment("");
      keyboardHide()
    } catch (error) {
      console.log(error)
    }
  };


  const onFocusCommentInput = () => {
    setIsKeyboard(true);
    setFocusCommentInput(true);
  }
  const onBlurCommentInput = () => {
    setIsKeyboard(false);
    setFocusCommentInput(false);
  }

  const keyboardHide = () => {
    setIsKeyboard(false);
    Keyboard.dismiss();
  };

  const renderItem = ({ item }) => {
    const currentUser = userId === item.userId;

    return (
      <View style={{
      marginBottom: 24,
      flexDirection: !currentUser ? 'row-reverse' : 'row',
    }}
      onStartShouldSetResponder={() => true}>
      <View>
          {avatar
            ? <Image source={{ uri: avatar }} style={styles.avatarImg} />
            : <Image source={defaultAvatar} style={styles.avatarImg} />}
      </View>
      
        <View style={{
          ...styles.comment,
          marginRight: currentUser ? 0 : 10,
          marginLeft: currentUser ? 10 : 0,
          borderTopLeftRadius: currentUser ? 0 : 6,
          borderTopRightRadius: currentUser ? 6 : 0,
        }}>
        <Text style={{ lineHeight: 18, fontSize: 13, color: "#212121" }}>{item.comment}</Text>
          <Text style={{
            ...styles.date,
          textAlign: !currentUser ? 'left' : 'right',
          }}>
          {item.date} | {item.time}
        </Text>
      </View>
             
    </View>
   )
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
        <View style={{flex:1, flexGrow :1, marginTop:24}}>
            <FlatList
          data={comments}
          keyExtractor={(item) => item.id}
          renderItem={renderItem}
            />
          {/* <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
          > */}
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
                onPress={createComment}
                style={styles.button}
                activeOpacity={0.8}
              >
                <AntDesign name='arrowup' size={20} color='#ffffff' />
              </TouchableOpacity>
            </View>
          {/* </KeyboardAvoidingView> */}
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
    marginTop: 24,
  },
   avatarImg: {
    borderRadius: 16,
    width: 38,
    height: 38,
  },
  comment: {
    borderWidth: 1,
    flex:1,
    // width: 'calc(100% - 44px)',
    padding:16,
    borderBottomLeftRadius: 6,
    borderBottomRightRadius: 6,
    borderColor: "rgba(0, 0, 0, 0.03)",
    backgroundColor: "rgba(0, 0, 0, 0.03)",
  },
  date: {
    fontSize: 10,
    lineHeight: 12,
    color: "#BDBDBD",
  },
  form: {
    position:"relative",
    justifyContent: 'center',
    backgroundColor: '#F6F6F6',
    borderColor: '#E8E8E8',
    borderRadius: 100,
    borderWidth: 1,
    marginTop: 24,
    marginBottom: 24
     
  },
  
  input: {
    marginRight: 40,
    paddingHorizontal: 16,
    fontFamily: "Roboto-Regular",
    fontSize: 16,
    lineHeight: 20,
    minHeight: 50, 
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

