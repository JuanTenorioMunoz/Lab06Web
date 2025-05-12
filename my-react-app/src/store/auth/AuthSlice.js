import { createSlice } from '@reduxjs/toolkit';

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    uid: null
  },
  reducers: {
    setUser: (state, action) => {
      state.uid = action.payload;
    },
    logoutUser: (state) => {
      state.uid = null;
    }
  }
});

export const { setUser, logoutUser } = authSlice.actions;
export default authSlice.reducer;