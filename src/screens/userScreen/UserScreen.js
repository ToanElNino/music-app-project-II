import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet,Image,ActivityIndicator, TouchableOpacity, Modal, Alert,Dimensions} from 'react-native';
import LogOut from '../../components/auth/LogOut';
import UserInfoItem from './UserInfoItem';
import {useSelector} from 'react-redux';
import ImagePicker from 'react-native-image-crop-picker';
import { userDataSelector } from '../../reducer/user/userReducer';
import { onValue } from 'firebase/database';
import { db } from '../../../firebase';
import { set, ref } from 'firebase/database';

const {width, height} = Dimensions.get('screen');

const UserScreen =()=>{
  const [userAvatar, setUserAvatar]= useState(null);
  const [imgUrl, setImgUrl] = useState(null);
  const [photo, setPhoto]=useState({});
  const userData = useSelector(userDataSelector);
  console.log(userData);
  console.log('check again: ', userInfo);
 const[userInfo, setUserInfo] = useState(undefined);
 const[curInfo, setCurInfo] = useState('');
 const [userRef, setUserRef] = useState(null);
 const [modalVisible, setModalVisible] = useState(false);

 useEffect(()=>{
  console.log('test state: ', userInfo);
  onValue(ref(db, 'users/'), (snapshot) => {
    const data = snapshot.val();
    console.log(data);
    for(let user in data){
      if(data[user].email === userData.email){
        console.log(user)
        console.log('same: ', data[user]);
        setUserInfo(data[user]);
        if(data[user].avatarURL===''){
          setUserAvatar('https://www.nicepng.com/png/detail/136-1366211_group-of-10-guys-login-user-icon-png.png');
          setImgUrl('https://www.nicepng.com/png/detail/136-1366211_group-of-10-guys-login-user-icon-png.png');
        }else{
          setUserAvatar(data[user].avatarURL);
          setImgUrl(data[user].avatarURL);
        }
        setUserRef(user);
      }
    }
   })
 },[userData]), 

  async function setUserInfo(){
    console.log('set user info');
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
  }
  const handleEditInformation = (labelTitle, curInfo) =>{
    console.log('edit');
    console.log(labelTitle);
    console.log(curInfo);
    console.log('check: ', userRef);
    console.log(userInfo);
    let updateInfo = {};
    if(labelTitle === 'Name: '){
      updateInfo = {...userInfo, username: curInfo};
      console.log('update name');
    }
    if(labelTitle === 'Home address: '){
      updateInfo = {...userInfo, home_address: curInfo};
      console.log('update home address');
    }
    if(labelTitle === 'Phone number: '){
      updateInfo = {...userInfo, phone_number: curInfo};
      console.log('update phone number');
    }
    if(labelTitle === 'Avatar'){
      updateInfo = {...userInfo, avatarURL: curInfo};
      console.log('update avatar');
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
       setModalVisible(false);
    }).catch((error)=>{
      console.log('loi: ',error);
      Alert.alert('Update information fail')
    })
  }
  const chooseImage = () => {
    ImagePicker.openPicker({
      mediaType: 'photo',
    })
      .then(image => {
        console.log('selected photo: ' + image);
        setImgUrl(image.path);
        setPhoto({
          uri:image.path,
          type:image.mime,
          name: image.path.substring(image.path.lastIndexOf('/') + 1),
        })
        console.log(photo);
      })
      .catch(error => {
        console.log('[error pick img]', error);
      });
  };
  const handleSave = async () =>{
   console.log('save');
   const data = new FormData();
   data.append('file', photo)
   data.append('upload_preset', '_UploadImage')
   data.append('cloud_name','project2cloud')
   await fetch('https://api.cloudinary.com/v1_1/project2cloud/upload',{
     method: 'POST',
     body: data,
     headers: {
       'Accept': 'application/json',
       'Content-Type': 'multipart/form-data'
     }
   }).then(res => res.json()).then(data =>{
     console.log('url photo response: '+ data.url);
     handleEditInformation('Avatar', data.url);
   }).catch( error=>{
     console.log('error upload image ',error);
     Alert.alert('Can not use this photo');
   });

  }
    return (
        <View style={styles.notificationContainer}>
        <View style={{backgroundColor: '#1e90ff', paddingHorizontal: 100, paddingBottom: 10, marginBottom: 10,}}>
        <TouchableOpacity
        onPress={()=> {
          console.log('open modal');
          setModalVisible(true);
        }}
        >
   
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
          >     
          </Image>
          <View>
              <Image
              style={{
              width: width / 8,
              height: width / 8,
              marginTop: -width / 2 + width / 4 + width/16,
              marginLeft: width / 2 - width / 8,
              padding: 10
              }}
              source={require('../../assets/icons/camera.png')}>
              </Image>      

          </View>
        </TouchableOpacity>
        </View>
          <Text style={styles.userInfoTitle}>User Information</Text>
          {userInfo ===undefined ? (
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
                labelTitle={'Home address: '}
                infoTitle={userInfo.home_address === ''? 'No information' : userInfo.home_address}
                handleEditInformation={handleEditInformation}
              />
              <UserInfoItem
                labelTitle={'Phone number: '}
                infoTitle={userInfo.phone_number === ''? 'No information' : userInfo.phone_number}
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
          <View>
            <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => {
              setModalVisible(!modalVisible);
            }}
            >
              <View style={styles.centeredView}>
                <View style={{backgroundColor: 'white', width: width*8/10, height: height/2, borderRadius: 10}}>
                  <View style={{ justifyContent:'space-around', marginTop: 10, alignItems:'center'}}>
                        <View>
                          <Image source={{uri:imgUrl }}
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
                          />
                        </View>
                        <View style={{marginTop: 20}}>
                          <TouchableOpacity style={styles.chooseImageBtn} onPress={()=>chooseImage()}>
                            <Text style={{color:'white',fontWeight:'700', fontSize: 14}}>Choose picture</Text>
                          </TouchableOpacity>
                          <TouchableOpacity style={styles.saveBttn} onPress={()=>handleSave()}>
                            <Text style={{color:'white',fontWeight:'700', fontSize: 14}}>Save</Text>
                          </TouchableOpacity>
                        </View>
                    </View>  
                    <TouchableOpacity onPress={()=> setModalVisible(false)}>
                      <Text>Hide</Text>
                    </TouchableOpacity>
                  </View>
              </View>
            </Modal>
          </View>
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
      marginTop: 10,
    },
    centeredView: {
      flex: 1,
      alignContent:  'center',
      justifyContent: "center",
      alignItems: "center",
      marginTop: 10
    },
    chooseImageBtn:{
      width: width/3,
      backgroundColor: '#ff0000',
      padding: 10,
      alignItems: 'center',
      marginTop: 10,
      borderRadius: 5,
    },
    saveBttn:{
      width: width/3,
      backgroundColor: '#1e90ff',
      padding: 10,
      alignItems: 'center',
      marginTop: 10,
      borderRadius: 5,
    }
  });