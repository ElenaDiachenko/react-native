import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    name: null,
    isAuth:false
}
const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers:{}
})

export default authSlice.reducer;