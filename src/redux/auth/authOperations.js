import { createUserWithEmailAndPassword,signInWithEmailAndPassword } from 'firebase/auth';
import { Alert } from "react-native";
import { auth } from '../../firebase/config'
import { authSlice} from "./authSlice";
const { changeAuthStatus,updateUserProfile } = authSlice.actions;

export const registerUser = ({ login,email, password}) => async (dispatch, getState) => {
      try {
        await createUserWithEmailAndPassword(auth, email, password);
  
        const user = auth.currentUser;
        const currentUser = {
          id: user.uid,
          login,
          email: user.email,
        }
        dispatch(updateUserProfile(currentUser));
        const state = getState();
        console.log(state, 'state redux REGISTER')
    } catch (error) {
    Alert.alert(error.message)
    console.log(error);
  };
   
}

export const loginUser = ({ email, password }) => async (dispatch, getState) => {
    try {
       await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = auth.currentUser;
        console.log(user, 'LOGIN USER')
        const currentUser = {
          id: user.uid,
          login:user.displayName,
          email: user.email,
        }
       dispatch(updateUserProfile(currentUser));
        const state = getState();
        console.log(state, 'state redux LOGIN')
        Alert.alert(`Wellcome, ${login}`)
    } catch (error) {
       Alert.alert(error.message)
        console.log(error);
    }
}