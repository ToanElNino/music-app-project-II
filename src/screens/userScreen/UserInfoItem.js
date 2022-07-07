import React,{useState} from 'react';
import {Text, View, StyleSheet,TouchableOpacity, Dimensions, TextInput, Pressable} from 'react-native';
import { Modal } from 'react-native-paper';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

const {width, height} = Dimensions.get('screen');
const checkField ='Email address: Login method: User id: ';
const UserInfoItem = ({labelTitle, infoTitle, handleEditInformation}) => {
  const [curInfo, setCurInfo] = useState(infoTitle);
  const [modalVisible, setModalVisible] = useState(false);
  console.log(infoTitle);
  return (
    <View>
      <View style={styles.itemContainer}>
        <View style={{flexDirection: 'row'}}>
          <Text style={styles.labelTitle}>{labelTitle}</Text>
          <Text style={styles.infoTitle}>{infoTitle}</Text>
        </View>
        <View style={{marginLeft: 10, marginTop: 5}}>
        {checkField.includes(labelTitle) ? null :(
          <TouchableOpacity onPress={()=> {
            setModalVisible(true);
            infoTitle === 'No information' ? setCurInfo('') : setCurInfo(infoTitle)
            console.log(infoTitle);
            }}>
            <FontAwesome name="edit" size={25}/>
          </TouchableOpacity>
        )}
        </View>
      </View>
      {/* Modal */}
      <View>
        <Modal 
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            setModalVisible(!modalVisible);
          }}>
            <View style={styles.centeredView}>
              <View style={{marginVertical: 10}}>
                <Text style={{color: '', fontSize: 17}}>Edit Information:</Text>
              </View>
                <TextInput
                  style={styles.textInput}
                  placeholder={'Enter new information'}
                  placeholderTextColor="#003f5c"
                  value={curInfo}
                  onChangeText={text => {
                    setCurInfo(text)
                    }}
                />
                <View style={{flexDirection: 'row'}}>
                  <Pressable
                      style={styles.saveButton}
                      onPress={()=>{
                        setModalVisible(!modalVisible);
                        handleEditInformation(labelTitle, curInfo);
                      }}
                      >
                    <Text style={{color: 'white', fontSize: 16}}>Save</Text>
                  </Pressable>
                  <Pressable
                      style={styles.saveButton}
                      onPress={()=>{
                        setModalVisible(false);
                        // handleEditInformation(labelTitle, curInfo);
                      }}
                      >
                    <Text style={{color: 'white', fontSize: 16}}>Close</Text>
                  </Pressable>

                </View>
              </View>
          </Modal>
        </View>
    </View>
  );
};

const styles = StyleSheet.create({
  itemContainer: {
    flexDirection: 'row',
    borderBottomColor: 'grey',
    borderBottomWidth: 0.7,
    marginTop: 2,
    paddingVertical: 5,
    justifyContent: 'space-between'
  },
  labelTitle: {
    fontWeight: '900',
    fontSize: 14,
    marginVertical: 8,
    color: '#6D1D3A',
    width: 100,
    marginRight: 50,
  },
  infoTitle: {
    marginVertical: 8,
    color: '#242A53',
  },
  centeredView: {
    height: height*20/100,
    width: width * 8/10,
    // flex: 1,
    // justifyContent: "center",
    alignItems: "center",
    marginBottom: height/2,
    backgroundColor: 'white',
    alignSelf: 'center',
    // marginTop: height * 1/10,
    borderRadius: 20,
    // shadowColor: "#000",
    // shadowOffset: {
    //   width: 0,
    //   height: 2,
    // },
    // shadowOpacity: 0.25,
    // shadowRadius: 3.84,

    // elevation: 5,
  },
  textInput: {
    width: 220,
    fontSize: 15,
    padding: 10,
    color: '#6D1D3A',
    borderColor: 'grey',
    borderWidth: 0.5,
    borderRadius: 10,
    paddingHorizontal: 20,
    marginRight: 10
  },
  saveButton:{
    marginTop: 10,
    borderRadius: 10,
    padding: 10,
    elevation: 2,
    backgroundColor: '#2196F3',
    marginHorizontal: 10,
  }
});

export default UserInfoItem;