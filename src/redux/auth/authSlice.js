import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  userId: null,
  login: null,
  email: null,
  authStatus: false,
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
    }),
        changeAuthStatus: (state, { payload }) => ({
      ...state,
      authStatus: payload.authStatus,
      }),
        logout:()=>initialState
    },
})
