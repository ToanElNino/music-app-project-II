import { db } from "../../../firebase";
import { set, ref, getDatabase } from 'firebase/database';

function guidGenerator() {
  var S4 = function() {
     return (((1+Math.random())*0x10000)|0).toString(16).substring(1);
  };
  return (S4()+S4()+"-"+S4()+"-"+S4()+"-"+S4()+"-"+S4()+S4()+S4());
}

export async function DeleteSongFromAlbum(params){
    console.log('call delete one song from album realtime database');
    // const {songName} = params;
    console.log(params.artistName);
    // console.log(guidGenerator());
//   set(ref(db, 'songs/' + guidGenerator()),{
//     id: 1,
//     song_name: params.songName,
//     artist_name: params.artistName,
//     category : params.category,
//     song_artwork_url: params.songArtworkUrl,
//     song_url: params.songURL,
//     duration: params.duration,
//     is_private: params.isPrivate,
//   }).then(()=>{
//     console.log('oke')
//   }).catch((error)=>{
//     console.log('loi: ',error);
//   })
}