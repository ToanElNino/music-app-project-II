import { db } from "../../../firebase";
import { set, ref, getDatabase } from 'firebase/database';
import { async } from "@firebase/util";

export async function CreateNewUser({emailAddress,password, userName}){
    console.log(emailAddress, password);
  set(ref(db, 'users/' + 123),{
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