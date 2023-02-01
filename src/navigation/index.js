import { useEffect} from 'react';
import {  useDispatch } from "react-redux";
import { NavigationContainer } from "@react-navigation/native";
import  Auth  from '../Screens/auth/Auth';
import  Home  from '../Screens/main/Home';
import { changeAuthStatusUser } from '../redux/auth/authOperations';
import {useAuth } from '../hooks/useAuth'

export const Navigation = () => {
    const dispatch = useDispatch();
    const {authStatus} = useAuth()

  
  useEffect(() => {
    dispatch(changeAuthStatusUser());
  }, []);
  
    return (
        <NavigationContainer>
            {authStatus ? <Home/>:<Auth/>}
        </NavigationContainer>
    )
}


