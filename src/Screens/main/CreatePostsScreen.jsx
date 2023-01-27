import { useEffect, useRef, useState } from 'react';
import { Camera } from 'expo-camera';
import { Ionicons} from "@expo/vector-icons";
import * as MediaLibrary from 'expo-media-library';
import { StyleSheet, View, Text ,TouchableOpacity, Image } from 'react-native';
// import { TouchableOpacity } from "react-native-gesture-handler";

const CreatePostsScreen = () => {
   let cameraRef = useRef();
  const [hasCameraPermission, setHasCameraPermission] = useState();
  const [hasMediaLibraryPermission, setHasMediaLibraryPermission] = useState();
  const [photo, setPhoto] = useState();

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

 let takePhoto = async () => {
    let options = {
      quality: 1,
      base64: true,
      exif: false
    };

    const {uri} = await cameraRef.current.takePictureAsync(options);
    setPhoto(uri);
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
      <View style={styles.container}>
        <Camera style={styles.camera}  ref={cameraRef}>
          {photo && (
          <View style={styles.takePhotoContainer}>
            <Image
              source={{ uri: photo }}
              style={{ height: 200, width: 200 }}
            />
          </View>
        )}
            <TouchableOpacity style={styles.photoIcon} onPress={takePhoto}>
              <Ionicons name="camera-outline" size={24} color="#BDBDBD" />
          </TouchableOpacity>
          </Camera>
        </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
    
  },
   camera: {
    height: 240,
    borderRadius: 8,
    marginBottom: 32,
    marginTop: 32,
    backgroundColor: "#e8e8e8",
    border: "1px solid #E8E8E8",
    justifyContent: "center",
    alignItems: "center",
   marginHorizontal:16,
  },
 
  photoIcon: {
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