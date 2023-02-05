import * as ImagePicker from "expo-image-picker";

export  const pickImage = async () => {
    let imagePath='';
    
      let result = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.All,
          allowsEditing: true,
          aspect: [4, 3],
          quality: 1,
        });
        if (!result.canceled) {
            imagePath =result.assets[0].uri;
        }
        return imagePath
  };
  