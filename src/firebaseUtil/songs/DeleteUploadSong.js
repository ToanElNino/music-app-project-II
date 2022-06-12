import { db } from "../../../firebase";
import { set, ref, getDatabase } from 'firebase/database';

export async function DeleteUploadSong(songId){
    console.log('call delte upload song');
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