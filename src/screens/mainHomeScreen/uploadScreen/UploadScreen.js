import React, {useState,useEffect} from 'react';
import {View, Text, StyleSheet, TouchableOpacity, Modal,Alert, Pressable, Dimensions, Image} from 'react-native';
import database from '@react-native-firebase/database';
import { TextInput } from 'react-native-paper';
import DropDownPicker from 'react-native-dropdown-picker';
import ImagePicker from 'react-native-image-crop-picker';
import DocumentPicker,{ types } from 'react-native-document-picker';
import Zeroconf from 'react-native-zeroconf'
const zeroconf = new Zeroconf()
const {width, height} = Dimensions.get('screen');

const UploadScreen =()=>{
  const [modalVisible, setModalVisible] = useState(false);
  const [imgUrl, setImgUrl] = useState('https://png.pngtree.com/png-vector/20190120/ourlarge/pngtree-gallery-vector-icon-png-image_470660.jpg');
  const [photo, setPhoto]=useState({});
  const [url, setUrl] = useState("");
  const [title, setTitle] = useState("");
  const [name, setName] = useState("");
///picker category
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(`Love song`);
  const [items, setItems] = useState([
    {label: 'Love song', value: 'love'},
    {label: 'Country', value: 'country'},
    {label: 'R&B', value: 'rnb'},
    {label: 'Rock', value: 'rock'},
  ]);
  //picker security
  const [open1, setOpen1] = useState(false);
  const [value1, setValue1] = useState(`Love song`);
  const [items1, setItems1] = useState([
    {label: 'Private', value: 'private'},
    {label: 'Public', value: 'public'},
  ]);
  //handle image
  const chooseImage = () => {
    ImagePicker.openPicker({
      mediaType: 'photo',
    })
      .then(image => {
        console.log('selected photo: ' + image.path);
        // setSelectedImage(image);
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

  const handleUpData = (photo)=>{
    const data = new FormData();
    data.append('file', photo)
    data.append('upload_preset', '_UploadImage')
    data.append('cloud_name','project2cloud')
    fetch('https://api.cloudinary.com/v1_1/project2cloud/image/upload',{
      method: 'POST',
      body: data,
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'multipart/form-data'
      }
    }).then(res => res.json()).then(data =>{
      console.log('url response: '+ data.url);
      console.log('data response: '+ data);
    }).catch( error=>{
      console.log('error upload image ',error);
    })
  }
  //handle file .mp3
  const chooseFile =async()=>{
    console.log('choose')
    // zeroconf = new Zeroconf()
    zeroconf.scan('http','tcp','local.');
    // this.zeroconf.scan('GPMDP')
    zeroconf.on('start', () => console.log('start.'))
    zeroconf.on('found', () => console.log('found')) 
    zeroconf.on('resolved', (service) => {
        console.log('found service, adding to list', service)
    })



    // try {
    //   const response = await DocumentPicker.pickSingle({
    //     type: [DocumentPicker.types.audio],
    //   });
    //   console.log(response);
    // } catch (err) {
    //   console.log(err);
    // }
  }
    return(
      <View>
        <View style={styles.centeredView}>
          <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => {
              Alert.alert("Modal has been closed.");
              setModalVisible(!modalVisible);
            }}
          >
            <View style={styles.centeredView}>
              <View style={styles.modalView}>
                <View style={{marginBottom: 20, borderBottomWidth: 1}}>
                  <Text style={{color:'blue', fontSize: 25, fontWeight: '600'}}>Up load your own song!</Text>
                </View>
                <View style={{alignSelf:'flex-start', height: 40,width: width*8/11, marginBottom:20}}>
                  <Text style={{fontSize:16}}>*Your song's name</Text>
                  <TextInput style={{height:40, borderWidth:1}}
                      value={'hehe'}
                      placeholder={`Enter song's name`}
                      >
                  </TextInput>
                </View>
                <View style={{alignSelf:'flex-start',marginTop:10, height: 40,width: width*8/11, marginBottom:20}}>
                  <Text style={{fontSize:16}}>*Artist's name</Text>
                  <TextInput style={{height:40, borderWidth:1}}
                      value={'hehe'}
                      placeholder={`Enter artist's name`}
                      >
                  </TextInput>
                </View>
                <View
                  style={{
                    marginTop:15,
                    width: width*8/11,
                  }}>
                  <DropDownPicker
                    placeholder="Choose song's category"
                    showArrowIcon={true}
                    showTickIcon={true}
                    open={open}
                    value={value}
                    items={items}
                    setOpen={setOpen}
                    setValue={setValue}
                    setItems={setItems}
                  />
                </View>
                <View style={{flexDirection:'row', justifyContent:'space-around', marginTop: 10}}>
                    <View style={{marginRight: 20}}>
                      <Image source={{uri:imgUrl }}
                                        style={{
                            aspectRatio: 1,
                            width: width / 3,
                            borderRadius: width / 100,
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
                      <TouchableOpacity style={styles.chooseImageBtn} onPress={()=> chooseFile()}>
                        <Text style={{color:'white',fontWeight:'700', fontSize: 14}}>Take a picture</Text>
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
                      handleUpData(photo);
                      }}
                  >
                    <Text style={styles.textStyle}>Upload song</Text>
                  </Pressable>

                </View>
              </View>
            </View>
          </Modal>
            <Pressable
              style={[styles.button, styles.buttonOpen]}
              onPress={() => setModalVisible(true)}
            >
              <Text style={styles.textStyle}>Show Modal</Text>
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
      marginTop: 22
    },
    modalView: {
      height: height*8/10,
      width: width*95/100,
      margin: 20,
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
    },
    buttonClose: {
      backgroundColor: "#2196F3",
    },
    textStyle: {
      color: "white",
      fontWeight: "bold",
      textAlign: "center"
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
