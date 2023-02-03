import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage } from '../firebase/config';

export const uploadPhotoToServer =async (photo, path)=> {
 if (!photo && !path) return;
    try {
      const response = await fetch(photo);
      const file = await response.blob();
      const fileId = Date.now().toString();

      const storageRef = ref(storage, `${path}/${fileId}`);
      await uploadBytes(storageRef, file);
      const photoURL = await getDownloadURL(storageRef);
      console.log(photoURL)
      return photoURL;

    } catch (error) {
      const errorCode = error.code;
       if (errorCode == 'storage/cannot-slice-blob') {
         Alert.alert('Try uploading again after verifying that the file has not changed');
       }
       else {
         Alert.alert('Something went wrong. Try again later');
       }
       console.log(error);
    }
}

