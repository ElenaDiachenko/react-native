import { useEffect} from 'react';
import { useSelector, useDispatch } from "react-redux";
import { NavigationContainer } from "@react-navigation/native";
import  Auth  from '../Screens/auth/Auth';
import  Home  from '../Screens/main/Home';
import { changeAuthStatusUser } from '../redux/auth/authOperations';


export const Navigation = () => {
const dispatch = useDispatch();

 const isAuth = useSelector(state => state.auth.authStatus); 
  
  useEffect(() => {
    dispatch(changeAuthStatusUser());
  }, []);
  
    return (
        <NavigationContainer>
            {isAuth ? <Home/>:<Auth/>}
        </NavigationContainer>
    )
}


