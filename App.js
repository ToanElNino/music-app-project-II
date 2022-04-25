import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import auth from '@react-native-firebase/auth';
import LoginLayout from './components/auth/LogIn';

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
    return subscriber; // unsubscribe on unmount
  }, []);

  if (initializing) return null;

  if (!user) {
    return <LoginLayout />;
  }
  const handleLogout = (email, password) => {
    auth()
      .signOut()
      .then(() => console.log('User signed out!'));
  };

  return (
    <View style={styles.container}>
      <Text>Welcome {user.email}</Text>
      <TouchableOpacity
        style={styles.loginButton}
        onPress={() => handleLogout()}>
        <Text style={{color: 'white'}}>Log Out</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  loginButton: {
    width: 220,
    backgroundColor: '#3A5BB3',
    padding: 10,
    alignItems: 'center',
    marginTop: 25,
    borderRadius: 10,
  },
});

export default App;
