import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet, Button} from 'react-native';
import TrackPlayer from 'react-native-track-player';
import songs from '../../model/data';
// import {useTrackPlayerProgress} from 'react-native-track-player/lib/hooks';
import Slider from '@react-native-community/slider';

const trackPlayerInit = async () => {
  await TrackPlayer.setupPlayer();
  await TrackPlayer.add(songs);
  return true;
};

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
      <Text>Music Player Component</Text>
      {/* <TrackPlayer></TrackPlayer> */}
      <View style={styles.optionButtons}>
        <Button
          style={styles.optionButton}
          title="Back"
          onPress={() => {
            console.log('Back');
          }}
        />
        <Button
          style={styles.optionButton}
          title={isPlaying ? 'Pause' : 'Play'}
          onPress={onButtonPressed}
        />
        <Button
          style={styles.optionButton}
          title="Next"
          onPress={() => {
            console.log('Next');
          }}
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
    </View>
  );
};

export default MusicPlayer;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: 'center',
    flexDirection: 'column',
    alignItems: 'center',
    alignContent: 'center',
  },
  optionButtons: {
    flexDirection: 'row',
    marginVertical: 20,
  },
  optionButton: {
    margin: 20,
  },
  slider: {
    padding: 10,
    width: '85%',
    height: 40,
  },
});
