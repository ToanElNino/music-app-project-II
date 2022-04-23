import React from 'react';
import {View, StyleSheet, StatusBar} from 'react-native';
import PlayIcon from './assets/icons/User.png';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
// import MusicPlayer from './components/auth/MusicPlayer';
import LoginLayout from './components/auth/LogIn';
import MusicPlayer from './components/Music/MusicPlayer';

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Sign in"
          component={LoginLayout}
          options={{
            title: 'Sign in',
            headerStyle: {
              backgroundColor: '#3A5BB3',
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
              fontWeight: 'bold',
            },
          }}
        />
        <Stack.Screen
          name="Music player"
          component={MusicPlayer}
          options={{
            title: 'Sign up', //Set Header Title
            headerStyle: {
              backgroundColor: '#3A5BB3', //Set Header color
            },
            headerTintColor: '#fff', //Set Header text color
            headerTitleStyle: {
              fontWeight: 'bold', //Set Header text style
            },
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default App;