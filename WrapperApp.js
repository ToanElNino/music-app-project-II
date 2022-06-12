import auth from '@react-native-firebase/auth';
import React from 'react';
import { Provider } from 'react-redux';
import store from './src/store/index';
import App from './App';

const WrapperApp = () => {

  return (
    <Provider store={store}>
      <App/>
    </Provider>
  );
};

export default WrapperApp;
