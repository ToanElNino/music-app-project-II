import { db } from "../../../firebase";
import { set, ref, getDatabase } from 'firebase/database';
import { async } from "@firebase/util";

export async function UpLoadNewSong(params){
    console.log('call create new song realtime database');
    // const {songName} = params;
    console.log(params.artistName);
    // console.log(songName);
    // const newSong = [{
    //     songName: songName,
    //     artistName: artistname,
    //     category: category,
    //     songArtworkUrl: photoPathRes,
    //     songURL: audioPathRes,
    //     duration: 300,
    //     isPrivate: items1,
    //   }]

  set(ref(db, 'songs/' + 123),{
    id: 1,
    song_name: params.songName,
    artist_name: params.artistName,
    category : params.category,
    song_artwork_url: params.songArtworkUrl,
    song_url: params.songURL,
    duration: params.duration,
    is_private: params.isPrivate,
  }).then(()=>{
    console.log('oke')
  }).catch((error)=>{
    console.log('loi: ',error);
  })
}