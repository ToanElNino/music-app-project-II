import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet,Image,ActivityIndicator, TouchableOpacity, Modal, Alert,Dimensions} from 'react-native';
import LogOut from '../../../components/auth/LogOut';
import { UpdateSongId } from '../../../firebaseUtil/songs/SongId';
import { GetuserId, UpdateuserId } from '../../../firebaseUtil/users/UserId';
import UserInfoItem from './UserInfoItem';
import {useSelector} from 'react-redux';
import { userDataSelector } from '../../../reducer/user/userReducer';
import { onValue } from 'firebase/database';
import { db } from '../../../../firebase';
import { set, ref, getDatabase } from 'firebase/database';
const {width, height} = Dimensions.get('screen');

// const userInformation ={
//     name: 'Nguyen Quoc Toan',
//     surname: 'Toan',
//     userName: 'toanquocnguyen1',
//     emailAddress:'toanquocnguyen192@gmail.com',
//     id: 96,
// }

const UserScreen =()=>{
  const [userAvatar, setUserAvatar]= useState('https://scontent.fhan5-8.fna.fbcdn.net/v/t1.6435-9/176193247_947549642683707_8080103501341098348_n.jpg?_nc_cat=110&ccb=1-7&_nc_sid=09cbfe&_nc_ohc=9TzziLJ1LOMAX9ILYss&tn=vaKJ2tfLFpfdSsxR&_nc_ht=scontent.fhan5-8.fna&oh=00_AT9dUMoCgfNiifqSUQA4Bf-ZynEimCZEgUF-eUnAKhItdA&oe=62CC5C25');
  const userData = useSelector(userDataSelector);
  console.log(userData);
 const[userInfo, setUserInfo] = useState([]);
 const[curInfo, setCurInfo] = useState('');
 const [userRef, setUserRef] = useState(null);
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
        console.log(user)
        setUserInfo(data[user]);
        console.log('same: ', data[user]);
        setUserRef(user);
      }
    }
   })
 },[userData]), 

  async function handleTest(){
    UpdateSongId(0);
  }
  const handleEditInformation = (labelTitle, curInfo) =>{
    console.log('edit');
    console.log(labelTitle);
    console.log(curInfo);
    console.log('check: ', userRef);
    console.log(userInfo);
    let updateInfo = {};
    if(labelTitle === 'Name: '){
      updateInfo = {...userInfo, userName: curInfo};
      console.log('update name');
    }
    if(labelTitle === 'Home address: '){
      updateInfo = {...userInfo, userName: curInfo};
      console.log('update home address');
    }
    if(labelTitle === 'Phone number: '){
      updateInfo = {...userInfo, userName: curInfo};
      console.log('update phone number');
    }
    
    set(ref(db, 'users/' + userRef),{
     ...updateInfo
    }).then(()=>{
      console.log('oke');
      // UpdateuserId(nextId);
      Alert.alert('Update information successfull')
      onValue(ref(db, 'users/'), (snapshot) => {
        const data = snapshot.val();
        console.log(data);
        for(let user in data){
          if(data[user].email === userData.email){
            console.log(user)
            setUserInfo(data[user]);
            console.log('same: ', data[user]);
            setUserRef(user);
          }
        }
       })
    }).catch((error)=>{
      console.log('loi: ',error);
    })
  }

    return (
        <View style={styles.notificationContainer}>
          <Image
            style={{
            marginTop: 20,
            marginBottom: 10,
            aspectRatio: 1,
            width: width / 2,
            borderRadius: width / 4,
            borderColor: '#1e90ff',
            borderWidth: 0.5,
            marginHorizontal: 0,
          }}
            source={{uri: userAvatar}}
          />
          <Text style={styles.userInfoTitle}>User Information</Text>
          {userInfo.length ? (
            <ActivityIndicator />
          ) : (
            <View style={styles.userInformations}>
              <UserInfoItem
                labelTitle={'Name: '}
                infoTitle={userInfo.username}
                handleEditInformation={handleEditInformation}
              />
              <UserInfoItem
                labelTitle={'Email address: '}
                infoTitle={userInfo.email}
                handleEditInformation={handleEditInformation}
              />
              <UserInfoItem
                labelTitle={'Home address:'}
                infoTitle={'67 Le Thanh Nghi'}
                handleEditInformation={handleEditInformation}
              />
              <UserInfoItem
                labelTitle={'Phone number'}
                infoTitle={'0386417319'}
                handleEditInformation={handleEditInformation}
              />
              <UserInfoItem
                labelTitle={'Login method: '}
                infoTitle={userInfo.user_login_method}
                handleEditInformation={handleEditInformation}
              />
              <UserInfoItem
                labelTitle={'User id:'}
                infoTitle={userInfo.id}
                handleEditInformation={handleEditInformation}
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
      height: height/5,
      // resizeMode: 'contain',
    },
    userInfoTitle: {
      fontSize: 25,
      fontWeight: 'bold',
    },
    userInformations: {
      marginTop: 20,
    },
  });