import auth from '@react-native-firebase/auth';
import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';

const LogOut = ({navigation}) => {
  const handleLogout = (email, password) => {
    auth()
      .signOut()
      .then(() => {
        console.log('User signed out!');
      });
  };
  return (
    <View style={styles.container}>
      {/* <Text>Welcome {user.email}</Text> */}
      <TouchableOpacity
        style={styles.loginButton}
        onPress={() => handleLogout()}>
        <Text style={{color: 'white'}}>Log Out</Text>
      </TouchableOpacity>
    </View>
  );
};

export default LogOut;

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
