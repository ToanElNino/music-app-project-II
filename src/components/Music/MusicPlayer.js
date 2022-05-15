import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet, Button, Pressable, Image} from 'react-native';
import TrackPlayer from 'react-native-track-player';
import songs from '../../../model/data';
import {useTrackPlayerProgress} from 'react-native-track-player/lib/hooks';
import Slider from '@react-native-community/slider';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Entypo from 'react-native-vector-icons/Entypo';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {Animated} from 'react-native';

const trackPlayerInit = async () => {
  await TrackPlayer.setupPlayer();
  await TrackPlayer.add(songs);
  return true;
};

// TrackPlayer.updateOptions({
//   stopWithApp: false,
//   capabilities: [
//     TrackPlayer.CAPABILITY_PLAY,
//     TrackPlayer.CAPABILITY_PAUSE,
//     TrackPlayer.CAPABILITY_JUMP_FORWARD,
//     TrackPlayer.CAPABILITY_JUMP_BACKWARD,
//   ],
// });
const MusicPlayer = () => {
  const [isTrackPlayerInit, setIsTrackPlayerInit] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);

  const [songIndex, setSongIndex] = useState(0);

  //the value of the slider should be between 0 and 1
  const [sliderValue, setSliderValue] = useState(0);

  //flag to check whether the use is sliding the seekbar or not
  const [isSeeking, setIsSeeking] = useState(false);

  //useTrackPlayerProgress is a hook which provides the current position and duration of the track player.
  //These values will update every 250ms
  // const {position, duration} = useTrackPlayerProgress(250);

  //initialize the TrackPlayer when the App component is mounted
  useEffect(() => {
    const startPlayer = async () => {
      let isInit = await trackPlayerInit();
      setIsTrackPlayerInit(isInit);
    };
    startPlayer();
  }, []);

  //this hook updates the value of the slider whenever the current position of the song changes
  // useEffect(() => {
  //   if (!isSeeking && position && duration) {
  //     setSliderValue(position / duration);
  //   }
  // }, [position, duration]);

  const onButtonPressed = () => {
    if (!isPlaying) {
      TrackPlayer.play();
      setIsPlaying(true);
    } else {
      TrackPlayer.pause();
      setIsPlaying(false);
    }
  };
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
  return (
    <View style={styles.container}>
      <View style={styles.songDetails}>
        <Text style={styles.songName}>Happier</Text>
        <Text style={styles.songArtist}>Ed Sheeran</Text>
      </View>
      <View style={styles.songImage}>
        <Image
          source={{
            uri: 'https://media.hitparade.ch/cover/big/ed_sheeran-happier_s.jpg',
          }}
          style={{width: 250, height: 250, borderRadius: 250 / 2}}
        />
      </View>
      <View style={styles.slider}>
        <Slider
          // style={{width: 400, height: 40}}
          minimumValue={0}
          maximumValue={1}
          value={sliderValue}
          minimumTrackTintColor="#111000"
          maximumTrackTintColor="#000000"
          onSlidingStart={slidingStarted}
          // onSlidingComplete={slidingCompleted}
        />
      </View>
      <View style={styles.optionButtons}>
        <View style={styles.optionButton}>
          <Entypo name="shuffle" size={30} color="black" />
        </View>
        <View style={styles.optionButton}>
          <AntDesign name="stepbackward" size={30} color="black" />
        </View>
        <View style={styles.optionButton}>
          <Pressable
            onPress={onButtonPressed}
            style={({pressed}) => [
              {
                backgroundColor: pressed ? 'red' : 'white',
              },
              styles.wrapperCustom,
            ]}>
            {isPlaying ? (
              <AntDesign name="pausecircle" size={30} color="black" />
            ) : (
              <AntDesign name="play" size={30} color="black" />
            )}
          </Pressable>
        </View>
        <View style={styles.optionButton}>
          <AntDesign name="stepforward" size={30} color="black" />
        </View>
        <View style={styles.optionButton}>
          <Entypo name="loop" size={30} color="black" />
        </View>
      </View>
      <View style={styles.reactButtons}>
        <View style={styles.reactButton}>
          <AntDesign name="hearto" size={25} color="black" />
        </View>
        <View style={styles.reactButton}>
          <FontAwesome name="comment-o" size={25} color="black" />
        </View>
        <View style={styles.reactButton}>
          <Entypo name="add-to-list" size={25} color="black" />
        </View>
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
  },
  songDetails: {
    alignItems: 'center',
    marginTop: 30,
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
    marginVertical: 20,
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
});
