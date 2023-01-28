import { useEffect, useRef, useState } from 'react';
import { Camera } from 'expo-camera';
import { Ionicons} from "@expo/vector-icons";
import * as MediaLibrary from 'expo-media-library';
import { StyleSheet, View, Text ,TouchableOpacity, Image,TouchableWithoutFeedback,KeyboardAvoidingView ,Keyboard} from 'react-native';
// import { TouchableOpacity } from "react-native-gesture-handler";

const CreatePostsScreen = () => {
  //  let cameraRef = useRef();
  const [hasCameraPermission, setHasCameraPermission] = useState();
  const [hasMediaLibraryPermission, setHasMediaLibraryPermission] = useState();
  const [photo, setPhoto] = useState();
  const [isKeyboard, setIsKeyboard] = useState(false);
const [cameraRef, setCameraRef] = useState(null);
  const [startCamera, setStartCamera] = useState(true);

  useEffect(() => {
    (async () => {
      const cameraPermission = await Camera.requestCameraPermissionsAsync();
      const mediaLibraryPermission = await MediaLibrary.requestPermissionsAsync();
      setHasCameraPermission(cameraPermission.status === "granted");
      setHasMediaLibraryPermission(mediaLibraryPermission.status === "granted");
    })();
  }, []);

    if (hasCameraPermission === undefined) {
    return <Text>Requesting permissions...</Text>
  } else if (!hasCameraPermission) {
    return <Text>Permission for camera not granted. Please change this in settings.</Text>
  }

    const keyboardHide = () => {
    setIsKeyboard(false);
    Keyboard.dismiss();
  };

 let takePhoto = async () => {
   if (cameraRef) {
      let options = {
      // quality: 1,
      // base64: true,
        exif: true,
        skipProcessing: true,
    };

    const {uri} = await cameraRef.current.takePictureAsync(options);
    setPhoto(uri);
    }
  };

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
                activeOpacity={0.8} onPress={takePhoto}>
              <Ionicons name="camera-outline" size={24} color={photo ? '#ffffff' : '#BDBDBD'} />
          </TouchableOpacity>
        </Camera>
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
    // backgroundColor: "#F6F6F6",
    // border: "1px solid #E8E8E8",
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
takePhotoContainer: {
    position: "absolute",
    top: 50,
    left: 10,
  // height: "100%",
  // width:'100%',
    borderColor: "#fff",
    borderWidth: 1,
  },
  addPhoto: { marginTop: 8 },
  upLoadPhotoText: {
    fontFamily: "Roboto-Regular",
    color: "#ccc",
    fontSize: 16,
    textAlign: "left",
  },
  input: {
    color: "#000",
    borderColor: "#E8E8E8",
    borderBottomWidth: 1,
    height: 40,
    marginBottom: 16,
    fontFamily: "Roboto-Regular",
    fontSize: 16,
  },
  button: {
    height: 40,
    borderRadius: 20,
    justifyContent: "center",
    marginTop: 16,
  },
  textButton: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  btnText: {
    textAlign: "center",
    fontFamily: "Roboto-Regular",
    fontSize: 18,
  },
  locationIcon: {
    position: "absolute",
    left: 0,
    top: 7,
  },
  deleteButtonBox: {
    alignItems: "center",
  },
  deleteButton: {
    width: 70,
    marginLeft: "auto",
    marginRight: "auto",
    marginTop: 100,
    justifyContent: "center",
    alignItems: "center",
    height: 40,
    backgroundColor: "#F6F6F6",
    borderRadius: 20,
    marginBottom: 36,
  },
});

  export default CreatePostsScreen;