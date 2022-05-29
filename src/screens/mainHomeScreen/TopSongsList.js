/* eslint-disable react/self-closing-comp */
import React from 'react';
import {View, Text, StyleSheet, Image, FlatList, Pressable} from 'react-native';
//import {Data} from '../../dataMock/NearList';

const Data = [
    {
      id: 1,
      title: '1 Phút',
      artist: 'Andiez',
      artwork: 'https://i.ytimg.com/vi/tIsuat2jg4I/maxresdefault.jpg',
      url: 'https://res.cloudinary.com/project2cloud/video/upload/v1649780603/ProjectII/1_Phu%CC%81t_Andiez_-1076372952_jqml3x.mp3',
      duration: 450,
    },
    {
      id: 2,
      title: 'Ánh nắng của anh',
      artist: 'Đức Phúc',
      artwork: 'https://yt.cdnxbvn.com/medias/topnews.com.vn/26520/anh-nang-cua-anh.jpg',
      url: 'https://res.cloudinary.com/project2cloud/video/upload/v1649781122/ProjectII/A%CC%81nh_Na%CC%86%CC%81ng_Cu%CC%89a_Anh_Cho%CC%9B%CC%80_Em_%C4%90e%CC%82%CC%81n_Nga%CC%80y_Mai_OST__%C4%90u%CC%9B%CC%81c_Phu%CC%81c_-1075798557_jmlggw.mp3',
      duration: 259,
    },
    {
      id: 3,
      title: 'Phút ban đầu',
      artist: 'Thái Vũ',
      artwork: 'https://zmp3-photo-fbcrawler.zadn.vn/thumb_video/c/f/9/0/cf90ef24dfaf8b68e0b81ff5bd8f19eb.jpg',
      url: 'https://res.cloudinary.com/project2cloud/video/upload/v1650706267/ProjectII/Phu%CC%81t_Ban_%C4%90a%CC%82%CC%80u_Vu%CC%83._-1078029226_u6ftkw.mp3',
      duration: 347,
    },
    {
      id: 4,
      title: '1 Phút',
      artist: 'Andiez',
      artwork: 'https://i.ytimg.com/vi/tIsuat2jg4I/maxresdefault.jpg',
      url: 'https://res.cloudinary.com/project2cloud/video/upload/v1649780603/ProjectII/1_Phu%CC%81t_Andiez_-1076372952_jqml3x.mp3',
      duration: 240,
    },
  ];
export const TopSongsList = ({navigation}) => {
  const Item = ({title}) => (
    <View style={styles.item}>
      <View style={styles.restaurantImage}>
        <Image
          resizeMode="contain"
          source={{uri: `${title.artwork}`}}
          style={styles.restaurantImage}></Image>
      </View>
    </View>
  );
  const renderItem = ({item, navigation}) => (
    <Pressable onPress={()=>{
      console.log(navigation);
      navigation.navigate('Love Songs',{
         song: item,
      })
    }}>
      <Item title={item} />
    </Pressable>
  );
  return (
    <View style={styles.container}>
      <View style={styles.textHeader}>
        <Text style={{fontSize: 16, color: '#191970', fontWeight:'bold'}}>Top Songs Today</Text>
        {/* <Text style={{fontSize: 14, color: '#00bfff'}}>Xem tất cả</Text> */}
      </View>
      <View style={styles.itemListContainer}>
        <FlatList
          horizontal={true}
          data={Data}
          renderItem={({item}) => renderItem({item, navigation})}
          keyExtractor={item => item.id}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    marginTop: 20,
    padding: 10,
    borderRadius: 10,
    marginHorizontal: 10,
  },
  restaurantImage: {
    width: 130,
    height: 90,
    borderRadius: 15,
  },
  textHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 10,
  },
  itemListContainer: {
    paddingVertical: 5,
    borderRadius: 10,
  },
  item: {
    marginHorizontal: 5,
  },
});