/* eslint-disable no-shadow */
/* eslint-disable react-native/no-inline-styles */
import React, {useState} from 'react';
import auth from '@react-native-firebase/auth';
import {Picker} from '@react-native-picker/picker';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  Image,
} from 'react-native';
import { CreateNewUser } from '../../firebaseUtil/users/CreateNewUser';

export default function SignUpLayout({navigation}) {
  const [emailAddress, setEmailAddress] = useState('');
  const [password, setPassword] = useState('');
  const [userName, setUserName]= useState(null);
  const [userLoginMethod, setUserLoginMethod]= useState('firebase');


  const handleSubmitEvent = (emailAddress, password, userName) => {
    console.log('sign up');
    auth()
      .createUserWithEmailAndPassword(emailAddress, password)
      .then(() => {
        console.log('User account created & signed in!');
        console.log(emailAddress);
        console.log(password);
        CreateNewUser({emailAddress,password, userName});
        alert('Sign up sucessful! Welcome to app');
      })
      .catch(error => {
        if (error.code === 'auth/email-already-in-use') {
          console.log('That email address is already in use!');
        }

        if (error.code === 'auth/invalid-email') {
          console.log('That email address is invalid!');
        }
        console.error(error);
      });
  };

  return (
    <SafeAreaView style={styles.container}>
      <Image
        style={styles.image}
        source={require('../../assets/Login/Logo.png')}
      />
      <View style={styles.scrollView}>
        <View style={styles.inputView}>
          <TextInput
            autoFocus={true}
            style={styles.textInput}
            placeholder="Email address"
            placeholderTextColor="#003f5c"
            onChangeText={emailInput => setEmailAddress(emailInput)}
          />
        </View>

        <View style={styles.inputView}>
          <TextInput
            style={styles.textInput}
            placeholder="Password"
            secureTextEntry={true}
            placeholderTextColor="#003f5c"
            onChangeText={passwordInput => setPassword(passwordInput)}
          />
        </View>
        <View style={styles.inputView}>
          <TextInput
            style={styles.textInput}
            placeholder="Your full name"
            placeholderTextColor="#003f5c"
            onChangeText={nameInput => setUserName(nameInput)}
          />
        </View>
        <View style={styles.inputView}>{/* <CheckBox /> */}</View>
      </View>

      <TouchableOpacity
        style={styles.signUpButton}
        onPress={() => handleSubmitEvent(emailAddress, password, userName)}>
        <Text style={{color: 'white'}}>Sign up</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: '#EEA1B1',
    alignItems: 'center',
    justifyContent: 'center',
  },
  scrollView: {
    width: '85%',
    paddingHorizontal: 20,
    paddingVertical: 20,
    marginTop: 0
  },
  image: {
    marginTop: 30,
    height: '40%',
    resizeMode: 'contain',
  },
  inputView: {
    borderBottomColor: 'black',
    borderBottomWidth: 1,
  },
  textInput: {
    marginLeft: 8,
    width: 250,
    fontSize: 15,
    padding: 10,
  },
  pickerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  signUpButton: {
    width: 250,
    backgroundColor: '#3A5BB3',
    padding: 10,
    alignItems: 'center',
    marginTop: 0,
    marginBottom: 50,
    borderRadius: 10,
  },
});
