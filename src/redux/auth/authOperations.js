import { createUserWithEmailAndPassword,signInWithEmailAndPassword, signOut ,  onAuthStateChanged, updateProfile, updateCurrentUser } from 'firebase/auth';
import { Alert } from "react-native";
import { auth } from '../../firebase/config'
import { authSlice} from "./authSlice";
const { changeAuthStatus,updateUserProfile,logout } = authSlice.actions;

export const registerUser = ({ login,email, password}) => async (dispatch, getState) => {
      try {
        await createUserWithEmailAndPassword(auth, email, password);
        await updateProfile(auth.currentUser, {
          displayName:login,
        })
        const user = auth.currentUser;
        const currentUser = {
          id: user.uid,
          login:user.displayName,
          email: user.email,
        }
        dispatch(updateUserProfile(currentUser));


        const state = getState();
        console.log(state, 'state redux REGISTER')

        Alert.alert(`Wellcome, ${login}`)
      } catch (error) {
       const errorCode = error.code;
       const errorMessage = error.message;

       if (errorCode == 'auth/weak-password') {
         Alert.alert('The password is too weak');
       }
       if (errorCode == 'auth/email-already-in-use') {
         Alert.alert('Already exists an account with the given email address');
       }
       if (errorCode == 'auth/invalid-email') {
         Alert.alert('Email address is not valid');
       }
       else {
         Alert.alert(errorMessage);
       }
       console.log(error);
     };
}


export const loginUser = ({ email, password }) => async () => {
    try {
       await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
        Alert.alert(`Wellcome, ${login}`)
    } catch (error) {
       const errorCode = error.code;
        const errorMessage = error.message;
        if (errorCode === 'auth/wrong-password') {
          Alert.alert('Password is invalid for the given email, or the account corresponding to the email does not have a password set');
        }
        if (errorCode === 'auth/user-not-found') {
          Alert.alert('No user corresponding to the given email');
        }
        if (errorCode === 'auth/user-disabled') {
          Alert.alert('User corresponding to the given email has been disabled');
        }
        if (errorCode === 'auth/invalid-email') {
          Alert.alert('Email address is not valid');
        } else {
          Alert.alert(errorMessage);
        }
        console.log(error);
      };
    }

export const changeAuthStatusUser = () => async (dispatch, getState) => {
 await onAuthStateChanged(auth, user => {
    if (user) {
      const currentUser = {
        id: user.uid,
        login: user.displayName,
        email: user.email,
      }
console.log(user, 'CHANGE USER')
      dispatch(updateUserProfile(currentUser));
      dispatch(changeAuthStatus({ authStatus: true }));
        const state = getState();
        console.log(state, 'state redux STATUS')
    }
  });
};

    
export const logoutUser = () => async (dispatch, getState) => {
    try {
     await signOut(auth);
      dispatch(logout());
    } catch (error) {
       Alert.alert(error.message)
        console.log(error);
    }
}