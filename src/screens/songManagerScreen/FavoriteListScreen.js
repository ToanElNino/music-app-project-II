import React, {useState, useEffect} from "react";
import {View, Text, StyleSheet, ScrollView, ActivityIndicator} from 'react-native';
import SongManagerItem from "./SongManagerItem";
import { userDataSelector } from '../../reducer/user/userReducer';
import {useSelector} from 'react-redux';
import { set, ref, getDatabase, onValue } from 'firebase/database';
import { db } from "../../../firebase";
import SongManagerList from "./SongManagerList";

const FavoriteListScreen =({navigation}) =>{
    const userData = useSelector(userDataSelector);
    const [userInfo, setUserInfo] = useState(null);
    const [listSong, setListSong] = useState(null);

    useEffect(()=>{
        console.log('re-render');
        console.log('user from store: ', userData);
        let data= null;
        onValue(ref(db, 'favoriteAlbum/'+ userData.id), (snapshot) => {
        data = snapshot.val();
        console.log(data);
        if(data.songs ==='init'){
            setListSong([]);
        }else{
            setListSong(data.songs);
        }
        })
        setUserInfo(userData);
    }, [userData, ])
    return(
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={{fontSize: 25, fontWeight: '600', color: 'blue'}}>Your Favorite Songs</Text>
            </View>
            <View>
            {
                listSong ? (
                <SongManagerList listSong ={listSong} navigation={navigation}/>
                ):
                (
                    <ActivityIndicator/>
                )
            }
            </View>
        </View>
    )
}
export default FavoriteListScreen;
const styles = StyleSheet.create({
    container:{
        alignContent: 'center',
        alignItems: 'center'
    },
    header:{
        paddingVertical: 20,
    },

});