import {createSlice} from '@reduxjs/toolkit';
const initialState = {
  userName: '',
  userData: {},
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    login: (state, action) => {
      state.userData = action.payload;
    },
  },
});

//reducer
const userReducer = userSlice.reducer;

export const userDataSelector = state => state.userReducer.userData;
export const {login} = userSlice.actions;
export default userReducer;