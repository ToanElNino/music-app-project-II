import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet,Image,ActivityIndicator, TouchableOpacity} from 'react-native';
import LogOut from '../../../components/auth/LogOut';
import { UpdateSongId } from '../../../firebaseUtil/songs/SongId';
import { GetuserId, UpdateuserId } from '../../../firebaseUtil/users/UserId';
import UserInfoItem from './UserInfoItem';
import {useSelector} from 'react-redux';
import { userDataSelector } from '../../../reducer/user/userReducer';
import { onValue } from 'firebase/database';
import { db } from '../../../../firebase';
import { ref } from 'firebase/database';

const userInformation ={
    name: 'Nguyen Quoc Toan',
    surname: 'Toan',
    userName: 'toanquocnguyen1',
    emailAddress:'toanquocnguyen192@gmail.com',
    id: 96,
}

const UserScreen =()=>{
  const [userAvatar, setUserAvatar]= useState(require('../../../assets/icons/User.png'))
  const userData = useSelector(userDataSelector);
  console.log(userData);
 const[userInfo, setUserInfo] = useState([]);

//  useEffect(()=>{
//   setUserInfo(userData);
//  },[])
 useEffect(()=>{
  console.log('test state: ', userInfo);
  onValue(ref(db, 'users/'), (snapshot) => {
    const data = snapshot.val();
    console.log(data);
    for(let user in data){
      if(data[user].email === userData.email){
        setUserInfo(data[user]);
        console.log('same: ', data[user]);
      }
    }
   })
 },[userData]), 

  async function handleTest(){
    UpdateSongId(0);
  }

    return (
        <View style={styles.notificationContainer}>
          <Image
            style={styles.image}
            source={userAvatar}
          />
          <Text style={styles.userInfoTitle}>User Information</Text>
          {userInfo.length ? (
            <ActivityIndicator />
          ) : (
            <View style={styles.userInformations}>
              <UserInfoItem
                labelTitle={'Name: '}
                infoTitle={userInfo.username}
              />
              <UserInfoItem
                labelTitle={'Email address: '}
                infoTitle={userInfo.email}
              />
              <UserInfoItem
                labelTitle={'Login method: '}
                infoTitle={userInfo.user_login_method}
              />
              <UserInfoItem
                labelTitle={'User id: '}
                infoTitle={userInfo.id}
              />
            </View>
          )}
          {/* <View style={{backgroundColor: 'red', paddingHorizontal: 20, paddingVertical: 10,}}>
            <TouchableOpacity onPress={() => handleTest()}>
              <Text>
                Test
              </Text>
            </TouchableOpacity>
          </View> */}
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
      marginTop: 50,
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