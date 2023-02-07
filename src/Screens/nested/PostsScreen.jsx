import React, { useState, useEffect } from 'react';
import { View,  StyleSheet, FlatList,Alert } from 'react-native';
import { doc, onSnapshot, collection,arrayRemove, setDoc,arrayUnion, getDoc, query, orderBy } from 'firebase/firestore';
import { db } from '../../firebase/config';
import { useAuth } from '../../hooks/useAuth';
import {PostsScreenItem} from "../../components";
import { Loader } from '../../components';

export const PostsScreen = ({ navigation }) => {
  const {userId} = useAuth()
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
       (async () => {
         try {
      setLoading(true)
     const q = query(collection(db, 'posts'), orderBy('date', 'desc'));
    
    onSnapshot(q, (querySnapshot) => {
      setPosts(querySnapshot.docs.map(doc => ({ ...doc.data(), id: doc.id, })))
    })
      setLoading(false)
   } catch (error) {
     console.log(error);
     Alert.alert("Something went wrong:( Try again later")
     setLoading(false)
   }
   
  })();
  }, []);

  
   const createLike = async (postId) => {
    try {
      const docRef = doc(db, 'posts', postId)
      const result = await getDoc(docRef)
      const { likes } = result.data();

      if (likes && likes.includes(userId)) {
        await setDoc(docRef, {
          likes: arrayRemove(userId)
      }, { merge: true });
      }
      else {
         await setDoc(docRef, {
        likes: arrayUnion(userId)
         }, { merge: true });
        
      }
    } catch (error) {
      console.log(error)
    }
  };
  
   const ItemDivider = () => {
    return (
      <View
        style={{
          height: 1,
          width: "100%",
          backgroundColor: "#bdbdbd",
        }}
      />
    );
  }

    return (
      <>
        {loading ? <Loader /> : (
           <View style={styles.container}>
        <View style={styles.postsContainer}>
          <FlatList
           data={posts}
           keyExtractor={(item) => item.id}
            renderItem={({ item }) => {
              return PostsScreenItem(item, navigation, createLike)
            }}
            ItemSeparatorComponent={ItemDivider}
          />
        </View>
        </View>
      )}
      </>
  )
}

const styles = StyleSheet.create({
    container: {
    flex: 1,
    paddingHorizontal:16,
    justifyContent: "flex-start",
    alignItems:"center",
    backgroundColor: "#ffffff",
  },
  postsContainer: {
    width: "100%",
  },
});

