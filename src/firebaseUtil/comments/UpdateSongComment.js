import { db } from "../../../firebase";
import { set, ref, getDatabase, onValue } from 'firebase/database';

export async function UpdateSongComment({songId, commentList}){
    console.log('call update song comment');
    console.log(songId);
    console.log(commentList);
    set(ref(db, 'comments/' + songId),{
        comments: commentList,
      }).then(()=>{
        console.log('oke')
      }).catch((error)=>{
        console.log('loi: ',error);
      })
}