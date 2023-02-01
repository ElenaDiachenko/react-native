import { useSelector } from 'react-redux';
import {
    selectUserId,
    selectLogin,
    selectEmail,
    selectAuthStatus
} from '../redux/auth/selectors'

export const useAuth = () => {
    return {
        userId: useSelector(selectUserId),
        login: useSelector(selectLogin),
        email: useSelector(selectEmail),
        authStatus: useSelector(selectAuthStatus)
    }
}