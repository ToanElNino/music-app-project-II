import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet, Button, Pressable, Image, Dimensions, TouchableOpacity, Linking, Modal, ScrollView, TextInput} from 'react-native';
import TrackPlayer from 'react-native-track-player';
import songs from '../../../model/data';
import {useTrackPlayerProgress} from 'react-native-track-player';
import Slider from '@react-native-community/slider';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Entypo from 'react-native-vector-icons/Entypo';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {Animated} from 'react-native';
import CommentItem from '../Comments/Comment';
// import LinearGradient from 'react-native-linear-gradient';
// const {position, duration} = useTrackPlayerProgress(250);

const comments =[
  {
    id: 1,
    userName: 'toanelnino',
    content: 'Nice song',
    commentDate: '20-10-2020',
  },
  {
    id: 2,
    userName: 'toanelnino',
    content: 'Nice song',
    commentDate: '20-10-2020',
  },
  {
    id: 3,
    userName: 'toanelnino',
    content: 'Nice song',
    commentDate: '20-10-2020',
  },
  {
    id: 4,
    userName: 'toanelnino',
    content: 'Nice song',
    commentDate: '20-10-2020',
  },
  {
    id: 5,
    userName: 'toanelnino',
    content: 'Nice song',
    commentDate: '20-10-2020',
  }
]

const {width, height} = Dimensions.get('screen');
// TrackPlayer.updateOptions({
//   stopWithApp: false,
//   capabilities: [
//     TrackPlayer.CAPABILITY_PLAY,
//     TrackPlayer.CAPABILITY_PAUSE,
//     TrackPlayer.CAPABILITY_JUMP_FORWARD,
//     TrackPlayer.CAPABILITY_JUMP_BACKWARD,
//   ],
// });
const MusicPlayer = (props) => {
  const [comment, setComment] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  //share facebook
  const [facebookShareURL, setFacebookShareURL] = useState(
    props.route.params.song.url,
  );
  const [postContent, setPostContent] = useState(
    'Hello Guys, This is a testing of facebook share example',
  );
    //option button
  const [isShuffle, setIsShuffle]= useState(false);
  const [isLoop, setIsLoop]= useState(false);
  const [sliding, setSliding] = useState('Inactive')

  const [clockState, setClockState]= useState();
  // useEffect(()=>{
  //   setInterval(()=>{
  //     const date = new Date();
  //     // setClockState(date.toLocaleTimeString())
  //     // setSliderValue(sliderValue + 0.1);
  //   },1000)
  // },[])
  console.log(props.route.params.song);
  const song=props.route.params.song;
  const convertSong = {...song, url:props.route.params.song.song_url} 
  //console.log(props.route.params.song_url);
  useEffect(()=>{
    const trackPlayerInit = async () => {
      await TrackPlayer.setupPlayer();
      await TrackPlayer.add(convertSong);
      return true;
    };
    const startPlayer = async () => {
      let isInit = await trackPlayerInit();
      setIsTrackPlayerInit(isInit);
    };
    startPlayer();
    setTimeout(()=>{
      TrackPlayer.play();
      setIsPlaying(true);
    },1000);

  },[song.id])

  useEffect(()=>{
    console.log('get song id');
  },[])
  const [isTrackPlayerInit, setIsTrackPlayerInit] = useState(false);
  const [isPlaying, setIsPlaying] = useState(true);

  const [songIndex, setSongIndex] = useState(0);

  //the value of the slider should be between 0 and 1
  const [sliderValue, setSliderValue] = useState(0);

  //flag to check whether the use is sliding the seekbar or not
  const [isSeeking, setIsSeeking] = useState(false);

  //useTrackPlayerProgress is a hook which provides the current position and duration of the track player.
  //These values will update every 250ms
  // const {position, duration} = useTrackPlayerProgress(250);

  //initialize the TrackPlayer when the App component is mounted
  // useEffect(() => {
  //   const startPlayer = async () => {
  //     let isInit = await trackPlayerInit();
  //     setIsTrackPlayerInit(isInit);
  //   };
  //   startPlayer();
  // }, []);

  //this hook updates the value of the slider whenever the current position of the song changes
  // useEffect(() => {
  //   if (!isSeeking && position && duration) {
  //     setSliderValue(position / duration);
  //   }
  // }, [position, duration]);
  // useEffect(()=>{
  //   setInterval(()=>{
  //     setSliderValue(0.8)
  //   },1000)
  // },[])

  const onButtonPressed = () => {
    if (!isPlaying) {
      TrackPlayer.play();
      setIsPlaying(true);
    } else {
      TrackPlayer.pause();
      setIsPlaying(false);
    }
  };
  const handleNext = async () =>{
    await TrackPlayer.skipToNext();
  }
  const handleBack = async () =>{
    await TrackPlayer.skipToPrevious();
  }
  //this function is called when the user starts to slide the seekbar
  const slidingStarted = () => {
    setIsSeeking(true);
  };
  //this function is called when the user stops sliding the seekbar
  // const slidingCompleted = async value => {
  //   await TrackPlayer.seekTo(value * duration);
  //   setSliderValue(value);
  //   setIsSeeking(false);
  // };

  const handleShareFacebook= ()=>{
      let facebookParameters = [];
      if (facebookShareURL)
        facebookParameters.push('u=' + encodeURI(facebookShareURL));
      // if (postContent) facebookParameters.push('quote=' + encodeURI(postContent));
      const url =
        'https://www.facebook.com/sharer/sharer.php?' +
        facebookParameters.join('&');
  
      Linking.openURL(url)
        .then(data => {
          console.log('data: ',data);
          console.log('oke');
        })
        .catch(() => {
          console.log('fail');
        });
}

  const handleSendComment = ()=>{
    console.log(comment);
  }
  return (
    <View style={styles.container}>
      <View style={styles.songDetails}>
        <Text style={styles.songName}>{song.song_name}</Text>
        <Text style={styles.songArtist}>{song.artist_name}</Text>
      </View>
      <View style={styles.songImage}>
        <Image
          source={{
            uri: song.song_artwork_url
          }}
          style={{width: 220, height: 220, borderRadius: 220 / 2}}
        />
      </View>
      <View style={styles.slider}>
        <Slider
          minimumValue={0}
          maximumValue={1}
          value={sliderValue}
          minimumTrackTintColor="green"
          maximumTrackTintColor="#000000"
          onSlidingStart={slidingStarted}
        />
      </View>
      <View style={{flexDirection:'row', justifyContent:'space-around'}}>
        <View style={{marginRight: 200}}>
          <Text>0:00</Text>
        </View>
        <View>
          <Text>{(song.duration- song.duration%60)/60}:{song.duration%60 > 10? song.duration%60 : '0' + song.duration%60}</Text>
        </View>
      </View>
      <View style={styles.optionButtons}>
        <View style={styles.optionButton}>
        <Pressable onPress={()=>{
          setIsShuffle(!isShuffle)
        }}>
          <Entypo name="shuffle" size={30} color={isShuffle? 'black': 'grey'} />

        </Pressable>
        </View>
        <View style={styles.optionButton}>
        <TouchableOpacity onPress={()=> handleBack()}>
          <AntDesign name="stepbackward" size={30} color="black" />

        </TouchableOpacity>
        </View>
        <View style={styles.optionButton}>
          <Pressable
            onPress={onButtonPressed}
            >
            {isPlaying ? (
              <AntDesign name="pausecircle" size={30} color="black" />
            ) : (
              <AntDesign name="play" size={30} color="black" />
            )}
          </Pressable>
        </View>
        <View style={styles.optionButton}>
        <TouchableOpacity onPress={()=> handleNext()}>
          <AntDesign name="stepforward" size={30} color="black" />
        </TouchableOpacity>
        </View>
        <View style={styles.optionButton}>
        <Pressable onPress={()=>{
          setIsLoop(!isLoop)
        }}>
          <Entypo name="loop" size={30} color={isLoop? 'black': 'grey'} />
        </Pressable>
        </View>
      </View>
      <View style={styles.reactButtons}>
        <View style={styles.reactButton}>
          <AntDesign name="hearto" size={25} color="black" />
        </View>
        <View style={styles.reactButton}>
          <TouchableOpacity onPress={() => setModalVisible(true)}>
          <FontAwesome name="comment-o" size={25} color="black" />

          </TouchableOpacity>
        </View>
        <View style={styles.reactButton}>
        <TouchableOpacity onPress={()=> handleShareFacebook()}>
          <FontAwesome name="share" size={25} color="black" />

        </TouchableOpacity>
        </View>
      </View>
      {/* modal */}
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
          <ScrollView style={{maxHeight: height*5/10, backgroundColor: 'white', width: width*85/100}}>
          {
            comments.map((comment, index)=>{
              return(
                <View style={styles.itemContainer} key={index}>
                  <View style={{marginLeft: 10 }}>
                    <View>
                      <Text>{comment.userName + ':'}</Text>
                    </View>
                    <View>
                      <Text>{comment.content}</Text>
                    </View>
                  </View>
                   <View>
                     <Text style={{color:'black'}}>{comment.commentDate}</Text>
                   </View>
              </View>
              )
            })
          }
          </ScrollView>
          <View style={styles.inputView}>
            <TextInput
              style={styles.textInput}
              placeholder="Phone or email"
              placeholderTextColor="#003f5c"
              value={comment}
              onChangeText={text => {
                setComment(text)
                }}
            />
             <View style={{backgroundColor: 'red', marginTop: 0, paddingTop: 11, paddingHorizontal: 10, borderRadius: 5}}>
              <TouchableOpacity onPress={()=> handleSendComment()}>
                <Text style={{alignSelf: 'center', color: 'white',fontSize: 16, fontWeight: '600'}}>
                  Send
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        <View>
          <TouchableOpacity onPress={()=> setModalVisible(false)}>
            <Text>Hide comments</Text>
          </TouchableOpacity>
        </View>
        </View>
      </Modal>
    </View>
    </View>
  );
};

export default MusicPlayer;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    alignContent: 'center',
    marginBottom: 100,
  },
  songDetails: {
    alignItems: 'center',
    marginTop: 10,
  },
  songName: {
    fontSize: 25,
    fontWeight: 'bold',
  },
  songArtist: {
    fontSize: 16,
  },
  songImage: {marginVertical: 40},
  optionButtons: {
    flexDirection: 'row',
    marginVertical: 10,
  },
  optionButton: {
    margin: 15,
  },
  slider: {
    padding: 10,
    width: '85%',
    height: 40,
  },
  reactButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  reactButton: {
    marginHorizontal: 50,
  },
  //modal
  centeredView: {
    height: height*70/100,
    width: width * 9/10,
    // flex: 1,
    justifyContent: "center",
    alignItems: "center",
    // marginTop: 22,
    backgroundColor: 'white',
    alignSelf: 'center',
    marginTop: height * 1/10,
    borderRadius: 20,
    shadowColor: "#000",
shadowOffset: {
	width: 0,
	height: 2,
},
shadowOpacity: 0.25,
shadowRadius: 3.84,

elevation: 5,
  },
  modalView: {
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
  itemContainer:{
    backgroundColor: 'grey', 
    marginVertical: 10,
    paddingVertical: 5,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: {
        width: 0,
        height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    flexDirection: 'row'
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
  inputView: {
    justifyContent: 'space-between',
    flexDirection:'row',
  },
});
