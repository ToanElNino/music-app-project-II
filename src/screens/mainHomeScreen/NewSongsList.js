/* eslint-disable react/self-closing-comp */
import React from 'react';
import {View, Text, StyleSheet, Image, FlatList, Pressable,} from 'react-native';
//import {Data} from '../../dataMock/NearList';

const Data = [
    {
      id: 1,
      image_url:
        'https://cdns-images.dzcdn.net/images/cover/a968ed3814acb2ef8f3929b1bebcb42d/500x500.jpg',
      restaurantName: 'Nhà hàng ABC - Bánh ngọt',
      restaurantAddress: 'Địa chỉ: 123 Trần Duy Hưng',
      restaurantPhoneNumber: '012 3456 789',
    },
    {
      id: 2,
      image_url:
        'https://i.ytimg.com/vi/eoJecvGMR6E/maxresdefault.jpg',
      restaurantName: 'Nhà hàng ABC - Bánh ngọt',
      restaurantAddress: 'Địa chỉ: 123 Trần Duy Hưng',
      restaurantPhoneNumber: '012 3456 789',
    },
    {
      id: 3,
      image_url:
        'https://zmp3-photo-fbcrawler.zadn.vn/thumb_video/c/f/9/0/cf90ef24dfaf8b68e0b81ff5bd8f19eb.jpg',
      restaurantName: 'Nhà hàng ABC - Bánh ngọt',
      restaurantAddress: 'Địa chỉ: 123 Trần Duy Hưng',
      restaurantPhoneNumber: '012 3456 789',
    },
    {
      id: 4,
      image_url:
        'https://avatar-ex-swe.nixcdn.com/song/2021/04/23/2/f/5/3/1619153014739_640.jpg',
      restaurantName: 'Nhà hàng ABC - Bánh ngọt',
      restaurantAddress: 'Địa chỉ: 123 Trần Duy Hưng',
      restaurantPhoneNumber: '012 3456 789',
    },
  ];
export const NewSongsList = ({navigation}) => {
  const Item = ({title}) => (
    <View style={styles.item}>
      <View style={styles.restaurantImage}>
        <Image
          resizeMode="contain"
          source={{uri: `${title.image_url}`}}
          style={styles.restaurantImage}></Image>
      </View>
    </View>
  );
  const renderItem = ({item}) => (
    <Pressable onPress={()=>{
      console.log('click')
    }}>
      <Item title={item} />
    </Pressable>
  );
  return (
    <View style={styles.container}>
      <View style={styles.textHeader}>
        <Text style={{fontSize: 16, color: '#191970', fontWeight:'bold'}}>New Songs Released</Text>
        {/* <Text style={{fontSize: 14, color: '#00bfff'}}>Xem tất cả</Text> */}
      </View>
      <View style={styles.itemListContainer}>
        <FlatList
          horizontal={true}
          data={Data}
          renderItem={renderItem}
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