import {configureStore} from '@reduxjs/toolkit';
import userReducer from '../reducer/user/userReducer';

const store = configureStore({
  reducer: {
    userReducer: userReducer,
  },
});
//selector

export default store;