import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { View, Text, StyleSheet,  FlatList,  ImageBackground } from 'react-native';
import { onSnapshot, collection, query, orderBy, where, setDoc, getDocs } from 'firebase/firestore';
import { db, storage,deleteObject, ref } from '../../firebase/config';

import { useAuth } from '../../hooks/useAuth';
import { pickImage } from '../../utils/pickImage';
import { uploadPhotoToServer } from '../../utils/uploadPhotoToServer';
import {updateUserAvatar} from '../../redux/auth/authOperations'
import { Avatar,ProfileScreenItem } from '../../components';
const image = require('../../../assets/images/auth-bg.jpg');
import { Ionicons } from '@expo/vector-icons';


const ProfileScreen = ({ navigation }) => {
  const {login,avatar, userId} = useAuth()
  const [posts, setPosts] = useState([]);
  const [newAvatar,setNewAvatar] = useState("")
  const uploadBtn= <Ionicons name="checkmark-circle-outline" size={30} color="black" /> 
  const dispatch= useDispatch()

  useEffect(() => {
    (async () => {
    const q = query(collection(db, 'posts'), where('userId', '==', userId), orderBy('date', 'desc'));
    
    onSnapshot(q, (querySnapshot) => {
      setPosts(querySnapshot.docs.map(doc => ({ ...doc.data(), id: doc.id, })))
    })
  })();
  }, []);


   const chooseImage = async () => {
        const imagePath = await pickImage();
        setNewAvatar(imagePath)
  };
  
  const deleteAvatar = async () => {
    try {
    const pictureRef = ref(storage, avatar);
    await deleteObject(pictureRef);
      
    } catch (error) {
      console.log(error)
    }
}
 
  const updateAvatar = async () => {
    await deleteAvatar()
    const photoURL = await uploadPhotoToServer(newAvatar, 'avatars');
    dispatch(updateUserAvatar(photoURL));

    const q = query(collection(db, 'posts'), where('userId', '==', userId));
     
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
   setDoc(doc.ref,{
    avatar:photoURL
   }, {merge: true})
}); 
    setNewAvatar('')
    
   }
   return (
       <View style={styles.mainContainer}>
        <ImageBackground source={image}  style={styles.imageBg}>
      <View style={styles.container}>
       <Avatar pickImage={newAvatar ? updateAvatar : chooseImage}  uri={newAvatar? newAvatar :avatar} button={newAvatar && uploadBtn} />
           <View style={{marginTop:80, marginBottom: 24}}>
             <Text style={styles.profileTitle}>{login }</Text>
          </View>
        <View style={styles.postsContainer}>
          <FlatList
           data={posts}
           keyExtractor={(item) => item.id}
            renderItem={({item})=>ProfileScreenItem(item, navigation)}
          />
        </View>
        </View>
           </ImageBackground>
              
            </View>
  )
}

const styles = StyleSheet.create({
    mainContainer:{flex:1},
    container: {
    position: "relative",
    borderTopRightRadius: 25,
    borderTopLeftRadius: 25,
    width: "100%",
    height: 550,
    flexDirection: "column",
    alignItems: "center",
    backgroundColor: '#FFFFFF',
    },
    imageBg: {
    flex: 1,
    justifyContent: 'flex-end',
    resizeMode:"cover"
    },
  profileTitle: {
    fontFamily: 'Roboto-Medium',
    fontSize: 30,
    lineHeight: 35,
    textAlign: 'center',
    letterSpacing: 0.01,
    color: '#212121',
  },
  postsContainer: {
    width: "100%",
    marginBottom: 120,
    paddingHorizontal: 16,
  },
  authorBox: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 32,
    marginBottom: 32,
    marginRight: 'auto'
  },
  avatarImg: {
    borderRadius: 16,
    width: 60,
    height: 60,
    marginRight: 8,
  },
  userName: {
    fontFamily: 'Roboto-Bold',
    fontSize: 13,
    lineHeight: 15,
    color: '#212121',
  },
  userEmail: {
    fontFamily: 'Roboto-Regular',
    fontSize: 11,
    lineHeight: 13,
    color: '#21212180'
  },
});
export default ProfileScreen
