import React from 'react';
import {View, Text, ScrollView} from 'react-native';
import SongManagerItem from './SongManagerItem';

const SongManagerList = ({navigation, listSong}) =>{
    console.log('list song: ', listSong);
    return(
        <ScrollView>
            {listSong.map((song, index)=>{
                return(
                <SongManagerItem navigation={navigation} song={song} key={index}/>
                )
            })}
        </ScrollView>
    )
}
export default SongManagerList;