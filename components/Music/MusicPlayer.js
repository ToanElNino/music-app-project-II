import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet, Button} from 'react-native';
import TrackPlayer from 'react-native-track-player';
import songs from '../../model/data';

const trackPlayerInit = async () => {
  await TrackPlayer.setupPlayer();
  await TrackPlayer.add({
    id: '1',
    url: 'https://res.cloudinary.com/project2cloud/video/upload/v1649780603/ProjectII/1_Phu%CC%81t_Andiez_-1076372952_jqml3x.mp3',
    type: 'default',
    title: 'Nhac cua Toan',
    album: 'My Album',
    artist: 'Quoc Toan',
    artwork:
      'https://scontent.fhan15-2.fna.fbcdn.net/v/t1.6435-9/176193247_947549642683707_8080103501341098348_n.jpg?_nc_cat=110&ccb=1-5&_nc_sid=09cbfe&_nc_ohc=NJQZt03AQ98AX8G2MbX&_nc_ht=scontent.fhan15-2.fna&oh=00_AT-nNdiUMWo54KBzmRlCWKdS_HTUhBYE3ElqcYpAVFuaVA&oe=62891FA5',
  });
  return true;
};

const MusicPlayer = () => {
  const [isTrackPlayerInit, setIsTrackPlayerInit] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  //initialize the TrackPlayer when the App component is mounted
  useEffect(() => {
    const startPlayer = async () => {
      let isInit = await trackPlayerInit();
      setIsTrackPlayerInit(isInit);
    };
    startPlayer();
  }, []);

  const onButtonPressed = () => {
    if (!isPlaying) {
      TrackPlayer.play();
      setIsPlaying(true);
    } else {
      TrackPlayer.pause();
      setIsPlaying(false);
    }
  };

  return (
    <View>
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
          title="Play"
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
    </View>
  );
};

export default MusicPlayer;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    alignContent: 'center',
  },
  optionButtons: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 20,
    borderRadius: 30,
  },
  optionButton: {
    backgroundColor: 'blue',
    borderRadius: 30,
  },
});
