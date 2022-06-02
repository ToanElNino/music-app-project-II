import { db } from "../../../firebase";
import { set, ref, getDatabase } from 'firebase/database';
import { async } from "@firebase/util";


function guidGenerator() {
  var S4 = function() {
     return (((1+Math.random())*0x10000)|0).toString(16).substring(1);
  };
  return (S4()+S4()+"-"+S4()+"-"+S4()+"-"+S4()+"-"+S4()+S4()+S4());
}

export async function CreateNewUser({emailAddress,password, userName}){
    console.log(emailAddress, password);
  set(ref(db, 'users/' + guidGenerator()),{
    id: 999,
    username: userName,
    email: emailAddress,
    password: password,
    avatarURL: null,
    user_login_method: 'firebase',
  }).then(()=>{
    console.log('oke')
  }).catch((error)=>{
    console.log('loi: ',error);
  })
}