import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet, Image, Dimensions} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

const {height, width} = Dimensions.get('screen');
const SongManagerItem = ({navigation, song}) =>{
    console.log('song from props: ', song);
    return(
        <View style={styles.container}>
            <View style={{padding: 10, marginRight: width/15}}>
                <Image 
                    source={{uri: song.song_artwork_url}} 
                    style={{width: width/6, height: width/6, borderRadius: 10,}}
                    resizeMode="contain"
                />
            </View>
            <View style={{width: width/2}}>
                <View>
                    <Text style={{color: 'black', fontSize: 16, fontWeight: '600'}}>{song.song_name.length > 15 ? song.song_name.substr(0,20) + '...': song.song_name}</Text>
                </View>
                <View>
                    <Text style={{fontSize: 15, fontWeight: '500'}}>
                        {song.artist_name}
                    </Text>
                </View>
            </View>
            <View style={{marginRight: 10}}>
                <TouchableOpacity>
                    <Ionicons name="remove-circle" size={30}/>
                </TouchableOpacity>
            </View>
        </View>
    )
}
export default SongManagerItem;

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignContent: 'center',
        alignItems: 'center',
        justifyContent: 'space-between',
        // backgroundColor: 'red',

    }
})