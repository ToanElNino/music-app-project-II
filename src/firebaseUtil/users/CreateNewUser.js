import { db } from "../../../firebase";
import { set, ref} from 'firebase/database';
import { UpdateuserId } from "./UserId";


function guidGenerator() {
  var S4 = function() {
     return (((1+Math.random())*0x10000)|0).toString(16).substring(1);
  };
  return (S4()+S4()+"-"+S4()+"-"+S4()+"-"+S4()+"-"+S4()+S4()+S4());
}

export async function CreateNewUser({emailAddress,password, userName, nextId}){
    console.log(emailAddress, password);
  set(ref(db, 'users/' + guidGenerator()),{
    id: nextId,
    username: userName,
    email: emailAddress,
    avatarURL: '',
    user_login_method: 'firebase',
    home_address: '',
    phone_number: '',
  }).then(()=>{
    console.log('oke');
    UpdateuserId(nextId);
  }).catch((error)=>{
    console.log('loi: ',error);
  })
}