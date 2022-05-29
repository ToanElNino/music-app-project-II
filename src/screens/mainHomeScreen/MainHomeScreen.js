import React from 'react';
import {View, Text, ScrollView, Dimensions} from 'react-native';
import { MainScreenBanner } from './MainScreenBanner';
import { NewSongsList } from './NewSongsList';
import { SearchHeader } from './SearchHeader';
import { TopSongsList } from './TopSongsList';
import {createStackNavigator} from '@react-navigation/stack';

const {width, height} = Dimensions.get('screen');

const MainHomeScreen =({navigation})=>{
    return(
        <View>
            <SearchHeader/>
            <ScrollView style={{marginBottom: 70}}>
                <MainScreenBanner/>
                <TopSongsList navigation={navigation}/>
                <NewSongsList navigation={navigation}/>
                <NewSongsList navigation={navigation}/>
            </ScrollView>
        </View>
    )
}
export default MainHomeScreen;