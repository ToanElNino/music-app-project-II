import { db } from "../../../firebase";
import { set, ref, getDatabase } from 'firebase/database';
import { async } from "@firebase/util";
import { UpdateSongId } from "./SongId";

function guidGenerator() {
  var S4 = function() {
     return (((1+Math.random())*0x10000)|0).toString(16).substring(1);
  };
  return (S4()+S4()+"-"+S4()+"-"+S4()+"-"+S4()+"-"+S4()+S4()+S4());
}

export async function UpLoadNewSong(params){
    console.log('call create new song realtime database');
    console.log(params.artistName);
  set(ref(db, 'songs/' + guidGenerator()),{
    id: params.id,
    song_name: params.songName,
    artist_name: params.artistName,
    category : params.category,
    song_artwork_url: params.songArtworkUrl,
    song_url: params.songURL,
    duration: params.duration,
    is_private: params.isPrivate,
  }).then(()=>{
    console.log('oke')
    UpdateSongId(params.id);
  }).catch((error)=>{
    console.log('loi: ',error);
  })
}