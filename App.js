import auth from '@react-native-firebase/auth';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React, {useEffect, useState} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import LogOut from './components/auth/LogOut';
import SignUpLayout from './components/auth/SignUp';
import LoginLayout from './components/auth/LogIn';
import MusicPlayer from './components/Music/MusicPlayer';

const Stack = createNativeStackNavigator();

const App = () => {
  // Set an initializing state whilst Firebase connects
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState();

  // Handle user state changes
  function onAuthStateChanged(user) {
    setUser(user);
    if (initializing) setInitializing(false);
  }

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber;
  }, []);
  return (
    <NavigationContainer>
      {user ? (
        <Stack.Navigator>
          <Stack.Screen
            name="Log out"
            component={LogOut}
            options={{
              title: 'Log out',
              headerStyle: {
                backgroundColor: '#3A5BB3',
              },
              headerTintColor: '#fff',
              headerTitleStyle: {
                fontWeight: 'bold',
              },
            }}
          />
        </Stack.Navigator>
      ) : (
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
              title: 'Music player',
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
            name="Sign up"
            component={SignUpLayout}
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
      )}
    </NavigationContainer>
  );
};

export default App;
