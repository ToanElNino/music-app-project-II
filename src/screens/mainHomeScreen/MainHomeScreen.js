import React from 'react';
import {View, Text} from 'react-native';
import { MainScreenBanner } from './MainScreenBanner';
import { NewSongsList } from './NewSongsList';
import { SearchHeader } from './SearchHeader';
import { TopSongsList } from './TopSongsList';

const MainHomeScreen =()=>{
    return(
        <View>
            <SearchHeader/>
            <MainScreenBanner/>
            <TopSongsList/>
            <NewSongsList/>
        </View>
    )
}
export default MainHomeScreen;