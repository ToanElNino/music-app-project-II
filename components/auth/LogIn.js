/* eslint-disable no-shadow */
/* eslint-disable react-native/no-inline-styles */
import auth from '@react-native-firebase/auth';
import React, {useState} from 'react';
import {
  Alert,
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {AccessToken, LoginManager} from 'react-native-fbsdk-next';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import AntDesign from 'react-native-vector-icons/AntDesign';

const LoginLayout = ({navigation}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [remember, setRemember] = useState(false);

  //firebase handle
  const handleSubmitEvent = (email, password) => {
    auth()
      .signInWithEmailAndPassword(
        'jane.doe@example.com',
        'SuperSecretPassword!',
      )
      .then(() => {
        console.log('Login success');
        Alert.alert('Sign in success');
      })
      .catch(error => {
        console.error(error);
      });
  };
  //facebook handle
  async function onFacebookButtonPress() {
    console.log('hehe');
    // Attempt login with permissions
    const result = await LoginManager.logInWithPermissions([
      'public_profile',
      'email',
    ]);

    if (result.isCancelled) {
      Alert.alert('loi');
      throw 'User cancelled the login process';
    }

    // Once signed in, get the users AccesToken
    const data = await AccessToken.getCurrentAccessToken();

    if (!data) {
      throw 'Something went wrong obtaining access token';
    }

    // Create a Firebase credential with the AccessToken
    const facebookCredential = auth.FacebookAuthProvider.credential(
      data.accessToken,
    );

    // Sign-in the user with the credential
    return auth().signInWithCredential(facebookCredential);
  }

  return (
    <View style={styles.container}>
      <Image
        style={styles.image}
        source={require('../../assets/Login/Logo.png')}
      />
      <View style={styles.inputView}>
        <View style={{marginTop: 12}}>
          <AntDesign name="user" size={20} color="black" />
        </View>
        <TextInput
          style={styles.textInput}
          placeholder="Phone or email"
          placeholderTextColor="#003f5c"
          onChangeText={email => setEmail(email)}
        />
      </View>
      <View style={styles.inputView}>
        <View style={{marginTop: 12}}>
          <AntDesign name="lock" size={20} color="black" />
        </View>
        <TextInput
          style={styles.textInput}
          placeholder="Password"
          placeholderTextColor="#003f5c"
          secureTextEntry={true}
          onChangeText={password => setPassword(password)}
        />
      </View>
      <TouchableOpacity
        style={styles.loginButton}
        onPress={() => handleSubmitEvent()}>
        <Text style={{color: 'white'}}>LOGIN</Text>
      </TouchableOpacity>
      <TouchableOpacity>
        <Text
          style={styles.forgotButtonText}
          onPress={() => navigation.navigate('Music player', {})}>
          Forgot Password?
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.loginFacebookButton}
        onPress={() =>
          onFacebookButtonPress().then(() =>
            console.log('Signed in with Facebook!'),
          )
        }>
        <FontAwesome name="facebook" size={20} color="#fff" />
        <Text style={{marginLeft: 10, color: '#fff', fontWeight: 'bold'}}>
          Login With Facebook
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.loginGoogleButton}
        onPress={() =>
          onFacebookButtonPress().then(() =>
            console.log('Signed in with Facebook!'),
          )
        }>
        <AntDesign name="google" size={20} color="#fff" />
        <Text style={{marginLeft: 10, color: '#fff', fontWeight: 'bold'}}>
          Login With Google
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={{marginTop: 20}}
        onPress={() => navigation.navigate('Sign up', {name: 'Sign up'})}>
        <Text style={styles.forgotButtonText}>
          Don't have an account? Create here
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    height: '25%',
    resizeMode: 'contain',
  },
  inputView: {
    flexDirection: 'row',
    borderBottomColor: 'black',
    borderBottomWidth: 1,
  },
  textInput: {
    width: 220,
    fontSize: 15,
    padding: 10,
    color: '#6D1D3A',
  },
  loginButton: {
    width: 250,
    backgroundColor: '#3A5BB3',
    padding: 10,
    alignItems: 'center',
    marginTop: 25,
    borderRadius: 10,
  },
  loginFacebookButton: {
    width: 250,
    marginTop: 50,
    borderRadius: 5,
    paddingVertical: 10,
    paddingHorizontal: 30,
    flexDirection: 'row',
    backgroundColor: '#3578E5',
  },
  loginGoogleButton: {
    width: 250,
    marginTop: 10,
    borderRadius: 5,
    paddingVertical: 10,
    paddingHorizontal: 30,
    flexDirection: 'row',
    backgroundColor: '#ff4500',
  },
  forgotButtonText: {
    marginTop: 8,
    fontSize: 17,
    color: '#6495ed',
  },
});

export default LoginLayout;
