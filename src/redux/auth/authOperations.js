import { createAsyncThunk } from '@reduxjs/toolkit';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../firebase/config'


export const register = ({login, email,password}) => {
    try {
        createUserWithEmailAndPassword(login, email,password)
    } catch (error) {
        console.log(error)
    }
}