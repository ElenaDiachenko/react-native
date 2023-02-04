import { useEffect, useRef, useState } from 'react';
import { Camera } from 'expo-camera';
import * as Location from 'expo-location';
import { Ionicons, Feather} from "@expo/vector-icons";
import * as MediaLibrary from 'expo-media-library';
import * as ImagePicker from "expo-image-picker";
import { StyleSheet, View, Text, TextInput ,TouchableOpacity, Image,TouchableWithoutFeedback,KeyboardAvoidingView ,Keyboard, Alert} from 'react-native';
import { collection, addDoc } from "firebase/firestore";
import { db} from '../../firebase/config'
import {useAuth} from '../../hooks/useAuth'
import { uploadPhotoToServer } from '../../utils/uploadPhotoToServer';
import { getLocation } from '../../utils/getLocation';

const CreatePostsScreen = ({ navigation }) => {
  //  let cameraRef = useRef();
  
  const [hasCameraPermission, setHasCameraPermission] = useState();
  const [hasLocationPermission, setHasLocationPermission] = useState(null);
  const [hasMediaLibraryPermission, setHasMediaLibraryPermission] = useState();
  const [photo, setPhoto] = useState('');
  const [isKeyboard, setIsKeyboard] = useState(false);
  const [cameraRef, setCameraRef] = useState(null);
  const [startCamera, setStartCamera] = useState(false);
  const [description, setDescription] = useState('');
  const [location, setLocation] = useState("");
  const [coords, setCoords] = useState(null)
  const { userId, login } = useAuth()

  useEffect(() => {
    (async () => {
      const cameraPermission = await Camera.requestCameraPermissionsAsync();
      const mediaLibraryPermission = await MediaLibrary.requestPermissionsAsync();
      const locationPermission = await Location.requestForegroundPermissionsAsync();
      setHasCameraPermission(cameraPermission.status === "granted");
      setHasMediaLibraryPermission(mediaLibraryPermission.status === "granted");
      setHasLocationPermission(locationPermission.status === 'granted');
    })();
  }, []);

    if (hasCameraPermission === undefined || hasLocationPermission === undefined) {
      return <Text>Requesting permissions...</Text>
    }else if (!hasLocationPermission ) {
      return <Text>Permission for location not granted. Please change this in settings.</Text>
    } else if (!hasCameraPermission) {
     return <Text>Permission for camera not granted. Please change this in settings.</Text>
  }

    const keyboardHide = () => {
    setIsKeyboard(false);
    Keyboard.dismiss();
  };

    const takePhotoWithLocationFromGallery = async () => {
      try {
        let result = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.All,
          allowsEditing: true,
          aspect: [4, 3],
          quality: 1,
        });
        if(result.canceled)return
      const {coords,city,country} = await getLocation()
       setLocation(`${city}, ${country}`);
        setCoords(coords);
        setPhoto(result.assets[0].uri);
      } catch (error) {
        console.log(error)
      }
  };
  

  let takePhotoWithLocation = async () => {
    if (!cameraRef) return;
  try {
      let options = {
        exif: true,
        skipProcessing: true,
    };

    const { uri } = await cameraRef.takePictureAsync(options);
    const {coords,city,country} = await getLocation()
     setLocation(`${city}, ${country}`);
     setCoords(coords);
     setPhoto(uri);
  
  } catch (error) {
    console.log(error)
  }
  };

  const reset = () => {
    setDescription('');
    setLocation("");
    setPhoto('')
  }
  
  const publishPost = async () => {
    if (photo && coords) {
      const photoURL = await uploadPhotoToServer(photo, 'images');
      try {
        
        const newPost= {
          photo: photoURL,
          description,
          location,
          coords,
          userId,
          login,
          comments:[]
        }
        await addDoc(collection(db, "posts"), newPost).then(() => {
      Alert.alert(`Post was added successfully`);
        });
        reset()
        navigation.navigate("Posts");
      } catch (error) {
        console.log(error)
      }
    }
  }

  // if (photo) {
  //   let sharePic = () => {
  //     shareAsync(photo).then(() => {
  //       setPhoto(undefined);
  //     });
  //   };

  //   let savePhoto = () => {
  //     MediaLibrary.saveToLibraryAsync(photo).then(() => {
  //       setPhoto(undefined);
  //     });
  //   };

 
  return (
    <TouchableWithoutFeedback onPress={keyboardHide}>
      <View style={styles.container}>
            <KeyboardAvoidingView behavior={Platform.OS == "ios" ? "padding" : "height"}>
                <View  style={{
              ...styles.form,
              marginBottom: Platform.OS === "ios" && isKeyboard ? 80 : 20,
            }}>
            <View style={{...styles.containerCamera,borderColor: photo ? '#000000' : '#E8E8E8'}}>
      <Camera
        style={{ ...styles.camera}}
         ref={(camRef) => setCameraRef(camRef)}
          autoFocus='auto'
        >
          {photo && (
            <Image
              source={{ uri: photo }}
              style={styles.preview}
            />
        )}
            <TouchableOpacity style={{
                  ...styles.photoIcon,
                  backgroundColor: photo ? 'rgba(255, 255, 255, 0.3)' : '#ffffff'
                }}
                activeOpacity={0.8} onPress={takePhotoWithLocation}>
              <Ionicons name="camera-outline" size={24} color={photo ? '#ffffff' : '#BDBDBD'} />
          </TouchableOpacity>
              </Camera>
               {!photo?(<TouchableOpacity
                onPress={takePhotoWithLocationFromGallery}
                activeOpacity={0.8}
              >
                <Text style={styles.uploadEditButton}>
                  Загрузить фото из галереи
                </Text>
              </TouchableOpacity>):(<TouchableOpacity
               onPress={()=>{}}
                activeOpacity={0.8}
              >
                <Text style={styles.uploadEditButton}>
                  Редактировать фото
                </Text>
              </TouchableOpacity>)}
            </View>
            <View>
                <TextInput
                  style={styles.input}
                  placeholder='Название...'
                  placeholderTextColor="#BDBDBD"
                  onFocus={() => setIsKeyboard(true)}
                  onChangeText={setDescription}
                  value={description}
              />
              <View style={{marginBottom: 32}}>
                <TextInput
                  style={{ ...styles.input, paddingLeft: 28}}
                  placeholder='Местность...'
                  placeholderTextColor="#BDBDBD"
                  onFocus={() => setIsKeyboard(true)}
                  onChangeText={setLocation}
                  value={location}
                />
                <Feather
                  name="map-pin"
                  size={24}
                  color="#BDBDBD"
                  style={styles.locationIcon}
                />
              </View>
               <TouchableOpacity
              onPress={publishPost}
              style={{ ...styles.button, backgroundColor: photo ? '#FF6C00' : '#F6F6F6' }}
              activeOpacity={0.8}
            >
              <Text
                style={{ ...styles.textBtnSubmit, color: photo ? '#ffffff' : '#BDBDBD' }}
              >
                Опубликовать
              </Text>
            </TouchableOpacity>
            </View>
        </View>
      </KeyboardAvoidingView>
    </View>
  </TouchableWithoutFeedback>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
  },
    form: {
        flex:1,
        paddingHorizontal: 16,
        
    },
  containerCamera: {
    position: "relative",
    height:240,
    borderRadius: 8,
    borderWidth: 1,
    backgroundColor: "#F6F6F6",
    marginBottom: 32,
    marginTop: 32,
    
  },
  camera: {
    height: "100%",
    width:"100%",
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
  },
 preview: {
    flex: 1,
   height: 240,
     borderRadius: 8,
    width: "100%"
  },
  photoIcon: {
    position: "absolute",
    height: 60,
    width: 60,
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(255, 255, 255, 0.3)",
  },
 uploadEditButton: {
    fontSize: 16,
    fontFamily: "Roboto-Regular",
    color: '#bdbdbd',
    marginTop: 8,
    marginBottom: 32,
  },
  input: {
    color: "#000",
    borderColor: "#E8E8E8",
    borderBottomWidth: 1,
    height: 50,
    marginBottom: 16,
    fontFamily: "Roboto-Regular",
    fontSize: 16,
  },
  locationIcon: {
    position: "absolute",
    left: 0,
    top: 8,
  },
 
   button: {
    height: 50,
    borderRadius: 100,
    justifyContent: 'center',
    alignItems:'center',
    marginTop: 46,
  },
 textBtnSubmit: {
    fontFamily: "Roboto-Regular",
    fontSize: 16,
  },
});

  export default CreatePostsScreen;