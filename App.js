import auth from '@react-native-firebase/auth';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React, {useEffect, useState} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import LogOut from './src/components/auth/LogOut';
import SignUpLayout from './src/components/auth/SignUp';
import LoginLayout from './src/components/auth/LogIn';
import Tabs from './src/navigation/tabs';
import {useDispatch} from 'react-redux';
import {login} from './src/reducer/user/userReducer';
import { db } from './firebase';
import { set, ref, getDatabase } from 'firebase/database';
import { onValue } from 'firebase/database';


// import { db } from './firebase';
const Stack = createNativeStackNavigator();

const App = () => {
  const dispatch = useDispatch();
  // Set an initializing state whilst Firebase connects
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState();

  // Handle user state changes
  async function onAuthStateChanged(user) {
    console.log('check user: ', user);
    setUser(user);
    onValue(ref(db, 'users/'), (snapshot) => {
      const data = snapshot.val();
      // console.log(data);
      if(user !=null){
        for(let user1 in data){
          if(data[user1].email === user.email){
            console.log(user1)
            console.log('same from app: ', data[user1]);
            dispatch(login(data[user1]));
            // setUserInfo(data[user]);
          }
        }
      }
     })
    // dispatch(login(user))
    if (initializing) setInitializing(false);
  }

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber;
  }, []);
  return (
      <NavigationContainer>
        {user ? (
          <Stack.Navigator screenOptions={{
          headerShown: false
        }}>
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
            <Stack.Screen
              name="Music player"
              component={Tabs}
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
              component={Tabs}
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
