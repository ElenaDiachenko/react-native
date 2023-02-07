import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  userId: null,
  login: null,
  email: null,
  authStatus: false,
  avatar: null,
}
 export const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        updateUserProfile: (state, { payload }) => ({
      ...state,
      userId: payload.id,
      login: payload.login,
      email: payload.email,
      avatar: payload.avatar,
    }),
        changeAuthStatus: (state, { payload }) => ({
      ...state,
      authStatus: payload.authStatus,
      }),
        changeAvatar: (state, { payload }) => ({
        ...state,
          avatar: payload.avatar,
      }),
        logout: () => initialState,
    },
      
})
