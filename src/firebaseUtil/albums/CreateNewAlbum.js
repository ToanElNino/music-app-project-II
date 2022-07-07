import { db } from "../../../firebase";
import { set, ref, getDatabase } from 'firebase/database';

function guidGenerator() {
  var S4 = function() {
     return (((1+Math.random())*0x10000)|0).toString(16).substring(1);
  };
  return (S4()+S4()+"-"+S4()+"-"+S4()+"-"+S4()+"-"+S4()+S4()+S4());
}

export async function CreateNewAlbum(params){
    console.log('call create new album realtime database');
  
}