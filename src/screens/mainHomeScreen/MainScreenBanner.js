import React from 'react';
import {View, Text, StyleSheet, Image} from 'react-native';

export const MainScreenBanner = () => {
  return (
    <View>
      <Image
        style={styles.bannerImage}
        source={{
          uri: 'https://img.pikbest.com/backgrounds/20210814/light-effect-music-notes-simple-creative-dark-blue-banner_6086811.jpg!c1024wm0',
        }}
      />
    </View>
  );
};
const styles = StyleSheet.create({
  bannerImage: {
    resizeMode: 'contain',
    height: 175,
    width: 350,
  },
});