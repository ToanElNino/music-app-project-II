import { db } from "../../../firebase";
import { set, ref, getDatabase } from 'firebase/database';

function guidGenerator() {
    var S4 = function() {
       return (((1+Math.random())*0x10000)|0).toString(16).substring(1);
    };
    return (S4()+S4()+"-"+S4()+"-"+S4()+"-"+S4()+"-"+S4()+S4()+S4());
  }

export async function GetSongId(songId){
    console.log('call get song id');
}
export async function UpdateSongId(curId){
    console.log('call update song id');
    set(ref(db, 'songId/' + '8e685ca0-7d58-c94e-d34e-f25be9474cce'),{
        id: curId+1,
      }).then(()=>{
        console.log('oke')
      }).catch((error)=>{
        console.log('loi: ',error);
      })
}