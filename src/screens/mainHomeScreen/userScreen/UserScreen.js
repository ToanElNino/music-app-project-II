import React from 'react';
import {View, Text, StyleSheet,Image,ActivityIndicator} from 'react-native';
import LogOut from '../../../components/auth/LogOut';
import UserInfoItem from './UserInfoItem';

const userInformation ={
    name: 'Nguyen Quoc Toan',
    surname: 'Toan',
    userName: 'toanquocnguyen1',
    emailAddress:'toanquocnguyen192@gmail.com',
    id: 96,
}

const UserScreen =()=>{
    return (
        <View style={styles.notificationContainer}>
          <Image
            style={styles.image}
            source={require('../../../assets/Login/Logo.png')}
          />
          <Text style={styles.userInfoTitle}>User Information</Text>
          {userInformation === null ? (
            <ActivityIndicator />
          ) : (
            <View style={styles.userInformations}>
              <UserInfoItem
                labelTitle={'Name: '}
                infoTitle={userInformation.name}
              />
              <UserInfoItem
                labelTitle={'Surname: '}
                infoTitle={userInformation.surname}
              />
              <UserInfoItem
                labelTitle={'User name: '}
                infoTitle={userInformation.userName}
              />
              <UserInfoItem
                labelTitle={'Email address: '}
                infoTitle={userInformation.emailAddress}
              />
              <UserInfoItem
                labelTitle={'User id: '}
                infoTitle={userInformation.id}
              />
            </View>
          )}
        </View>
      );
}
export default UserScreen;
const styles = StyleSheet.create({
    notificationContainer: {
      flexDirection: 'column',
      alignItems: 'center',
    },
    image: {
      height: '30%',
      resizeMode: 'contain',
    },
    userInfoTitle: {
      fontSize: 25,
      fontWeight: 'bold',
    },
    userInformations: {
      marginTop: 20,
    },
  });