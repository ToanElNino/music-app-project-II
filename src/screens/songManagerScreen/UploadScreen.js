import React, {useState,useEffect} from 'react';
import {View, Text, StyleSheet, TouchableOpacity, Modal,Alert, Pressable, Dimensions, Image} from 'react-native';
import { TextInput } from 'react-native-paper';
import DropDownPicker from 'react-native-dropdown-picker';
import ImagePicker from 'react-native-image-crop-picker';
import DocumentPicker,{ types } from 'react-native-document-picker';
const {width, height} = Dimensions.get('screen');
import { UpLoadNewSong } from '../../firebaseUtil/songs/UpLoadNewSong';
import { db } from "../../../firebase";
import { set, ref, getDatabase, onValue } from 'firebase/database';

const UploadScreen =()=>{
  const [modalVisible, setModalVisible] = useState(false);
  const [imgUrl, setImgUrl] = useState('https://png.pngtree.com/png-vector/20190120/ourlarge/pngtree-gallery-vector-icon-png-image_470660.jpg');
  const [photo, setPhoto]=useState({});
  const [audio, setAudio]= useState({});
  //check upload

  //file's name
  const [audioName, setAuidoName]= useState('No choosen file');
//text input value
 const [songName, setSongName]= useState("");
 const [artistname, setArtistName] = useState("");
// url respone
 const [songURLRes, setSongUrlRes]= useState('');
 const [audioURLRes, setAudioUrlRes]= useState('');
 const [nextId, setNextId]= useState(null);

///picker category
  const [open, setOpen] = useState(false);
  const [category, setCategory] = useState(`Love song`);
  const [items, setItems] = useState([
    {label: 'Category: Love song', value: 'love'},
    {label: 'Category: Country', value: 'country'},
    {label: 'Category: R&B', value: 'rnb'},
    {label: 'Category: Rock', value: 'rock'},
  ]);
  //picker security
  const [open1, setOpen1] = useState(false);
  const [value1, setValue1] = useState(`Love song`);
  const [items1, setItems1] = useState([
    {label: 'Private', value: true},
    {label: 'Public', value: false},
  ]);
  //get Id for song
  useEffect(()=>{
    onValue(ref(db, 'songId/'+ '8e685ca0-7d58-c94e-d34e-f25be9474cce'), (snapshot) => {
      const data = snapshot.val();
      console.log(data);
      setNextId(data.id);
  })
  },[])
  //handle image
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
   //handle file .mp3
   const chooseFile =async()=>{
    console.log('choose')
    try {
      const response = await DocumentPicker.pickSingle({
        type: [DocumentPicker.types.audio],
      });
      console.log(response);
      setAuidoName(response.name + '.mp3')
      setAudio({
        uri:response.uri,
        type:response.type,
        name: response.uri.substring(response.uri.lastIndexOf('/') + 1),
      })
    } catch (err) {
      console.log(err);
    }
    console.log('audio: ',audio);
  }

  // handle upload song
  const handleUpData = async ({photo, audio})=>{
    console.log("-----");
    let photoPathRes = '';
    let audioPathRes='';
    const data1 = new FormData();
    data1.append('file', photo)
    data1.append('upload_preset', '_UploadImage')
    data1.append('cloud_name','project2cloud')
    await fetch('https://api.cloudinary.com/v1_1/project2cloud/upload',{
      method: 'POST',
      body: data1,
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'multipart/form-data'
      }
    }).then(res => res.json()).then(data =>{
      console.log('url photo response: '+ data.url);
      photoPathRes=data.url;
        console.log('photoPathRes: ',photoPathRes);
    }).catch( error=>{
      console.log('error upload image ',error);
    });
    const data2 = new FormData();
    data2.append('file', audio)
    data2.append('upload_preset', '_UploadImage')
    data2.append('cloud_name','project2cloud')
    await fetch('https://api.cloudinary.com/v1_1/project2cloud/upload',{
      method: 'POST',
      body: data2,
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'multipart/form-data'
      }
    }).then(res => res.json()).then(data =>{
      console.log('url photo response: '+ data.url);
         audioPathRes= data.url;
        console.log('audioPathRes: ',audioPathRes);
    }).catch( error=>{
      console.log('error upload audio ',error);
    })
    if(audioPathRes&&photoPathRes){
      // UpLoadNewSong({songName, artistname, category,photoPathRes, audioPathRes, "300", true: Boolean});
      const newSong = {
        id: nextId,
        songName: songName,
        artistName: artistname,
        category: category,
        songArtworkUrl: photoPathRes,
        songURL: audioPathRes,
        duration: 300,
        isPrivate: value1,
      }
      console.log(photoPathRes);
      console.log(audioPathRes);
      await UpLoadNewSong(newSong);
      Alert.alert('Upload song sucessfully!');
    }else{
      alert('Upload fail! Invalid image or audio. Please try again!');
    }
  }

    return(
      <View>
        <View style={styles.modalContainer}>
          <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => {
              setModalVisible(!modalVisible);
            }}
          >
            <View style={styles.centeredView}>
              <View style={styles.modalView}>
                <View style={{marginBottom: 20, borderBottomWidth: 1}}>
                  <Text style={{color:'blue', fontSize: 25, fontWeight: '600'}}>Up load your own song!</Text>
                </View>
                <View style={{alignSelf:'flex-start', height: 40,width: width*75/100, marginBottom:20}}>
                  <Text style={{fontSize:16, fontWeight: '600', color:'#2196F3'}}>*Your song's name</Text>
                  <TextInput style={{height:45, borderWidth:1, backgroundColor:'#f5f5f5', borderRadius: 10}}
                      value={songName}
                      placeholder={`Enter song's name`}
                      onChangeText={(input)=> setSongName(input)}
                      >
                  </TextInput>
                </View>
                <View style={{alignSelf:'flex-start',marginTop:10, height: 40,width: width*75/100, marginBottom:20}}>
                  <Text style={{fontSize:16, fontWeight: '600', color: '#2196F3'}}>*Artist's name</Text>
                  <TextInput style={{height:45, borderWidth:1, backgroundColor:'#f5f5f5', borderRadius: 10}}
                      value={artistname}
                      placeholder={`Enter artist's name`}
                      onChangeText={(input)=> setArtistName(input)}
                      >
                  </TextInput>
                </View>
                <View
                  style={{
                    marginTop:15,
                    width: width*75/100,
                  }}>
                  <DropDownPicker
                  style={{
                          backgroundColor: "#f5f5f5"
                        }}
                    placeholder="Choose song's category"
                    showArrowIcon={true}
                    showTickIcon={true}
                    open={open}
                    value={category}
                    items={items}
                    setOpen={setOpen}
                    setValue={setCategory}
                    setItems={setItems}
                  />
                </View>
                <View style={{flexDirection:'row', justifyContent:'space-around', marginTop: 10, alignItems:'center'}}>
                    <View style={{marginRight: 20}}>
                      <Image source={{uri:imgUrl }}
                                        style={{
                            aspectRatio: 1,
                            width: width / 3,
                            borderRadius: width / 100,
                            borderColor: 'black',
                            borderWidth: 1,
                            marginHorizontal: 0,
                          }}
                      />
                    </View>
                    <View style={{marginTop: 20}}>
                      <TouchableOpacity style={styles.chooseImageBtn} onPress={()=>chooseImage()}>
                        <Text style={{color:'white',fontWeight:'700', fontSize: 14}}>Choose picture</Text>
                      </TouchableOpacity>
                    </View>
                </View>  
                <View style={{flexDirection:'column', backgroundColor: '#f5f5f5', borderRadius: 5,
                           width: width*75/100, justifyContent:'space-between', marginVertical: 10,
                           borderWidth: 1,
                           alignContent: 'center', alignItems: 'center'
                           }}>
                  <View style={{paddingVertical: 5, paddingHorizontal: 10, alignSelf: 'flex-start'}}>
                    <Text style={{fontSize: 15, fontWeight: '500'}}>{audioName.length>27 ? audioName.substring(0,30) + '...': audioName}</Text>
                  </View>
                  <View style={{paddingHorizontal: 10, marginBottom: 7}}>
                    <TouchableOpacity style={styles.chooseImageBtn} onPress={()=> chooseFile()}>
                        <Text style={{color:'white',fontWeight:'700', fontSize: 14}}>Choose audio</Text>
                      </TouchableOpacity>
                  </View>
                  
                </View>
                <View style={{flexDirection:'row', justifyContent:'space-between'}}>
                  <View style={{marginTop: 15, marginRight: 20}}>
                    <Text style={{fontSize:16}}>*Sercuity mode: </Text>
                  </View>
                  <View
                  style={{
                    marginTop:5,
                    width: width/3,
                  }}>
                  <DropDownPicker
                  style={{
  backgroundColor: "#f5f5f5"
}}
                    placeholder="Private"
                    showArrowIcon={true}
                    showTickIcon={true}
                    open={open1}
                    value={value1}
                    items={items1}
                    setOpen={setOpen1}
                    setValue={setValue1}
                    setItems={setItems1}
                  />
                </View>
                </View>
                <View style={{marginTop: 20}}>
                  <Pressable
                    style={[styles.button, styles.buttonClose]}
                    onPress={() => {
                      setModalVisible(!modalVisible)
                      // handleUpMultiFile({photo, audio});
                      // handleUpData(audio);
                      handleUpData({photo, audio});
                      }}
                  >
                    <Text style={styles.textStyle}>Upload</Text>
                  </Pressable>

                </View>
              </View>
            </View>
          </Modal>
            <Pressable
              style={[styles.button, styles.buttonOpen]}
              onPress={() => setModalVisible(true)}
            >
              <Text style={styles.textStyle}>+ Upload song</Text>
            </Pressable>
        </View>
      </View>
    )
}
export default UploadScreen;
const styles= StyleSheet.create({
    container:{
        flex:1,
        alignItems:'center',
    },
    modalContainer:{
      alignItems: 'center',
      marginTop: 100,
    },
    upLoadBtn:{
        width: 250,
        backgroundColor: '#3A5BB3',
        padding: 10,
        alignItems: 'center',
        marginTop: 25,
        borderRadius: 10,
    },
    centeredView: {
      // flex: 1,
      justifyContent: "center",
      alignItems: "center",
      marginTop: 10
    },
    modalView: {
      height: height*89/100,
      width: width*95/100,
      marginBottom: 30,
      backgroundColor: "white",
      borderRadius: 20,
      padding: 35,
      alignItems: "center",
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 2
      },
      shadowOpacity: 0.25,
      shadowRadius: 4,
      elevation: 5
    },
    button: {
      borderRadius: 20,
      padding: 10,
      elevation: 2
    },
    buttonOpen: {
      backgroundColor: "#F194FF",
      width: 250,
      backgroundColor: '#3A5BB3',
      padding: 10,
      alignItems: 'center',
      marginTop: 25,
      borderRadius: 10,
    },
    buttonClose: {
      backgroundColor: "#2196F3",
      width: 150,
      backgroundColor: '#3A5BB3',
      padding: 10,
      alignItems: 'center',
      borderRadius: 10,
    },
    textStyle: {
      color: "white",
      fontWeight: "bold",
      textAlign: "center",
      fontSize: 16
    },
    modalText: {
      marginBottom: 15,
      textAlign: "center"
    },
    chooseImageBtn:{
      width: width/3,
      backgroundColor: '#ff0000',
      padding: 10,
      alignItems: 'center',
      marginTop: 10,
      borderRadius: 5,
    }
})
