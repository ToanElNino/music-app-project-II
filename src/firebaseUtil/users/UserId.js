import { db } from "../../../firebase";
import { set, ref, getDatabase, onValue } from 'firebase/database';

function guidGenerator() {
    var S4 = function() {
       return (((1+Math.random())*0x10000)|0).toString(16).substring(1);
    };
    return (S4()+S4()+"-"+S4()+"-"+S4()+"-"+S4()+"-"+S4()+S4()+S4());
  }

export async function GetuserId(userId){
    onValue(ref(db, 'userId/'+ 'd0378070-c4e5-abd9-bbc0-7ba816218e0a'), (snapshot) => {
        const data = snapshot.val();
        console.log(data);
        // return data;
        //  return data['d0378070-c4e5-abd9-bbc0-7ba816218e0a'].id;
    })
}
export async function UpdateuserId(curId){
    console.log('call update user id');
    set(ref(db, 'userId/' + 'd0378070-c4e5-abd9-bbc0-7ba816218e0a'),{
        id: curId + 1,
      }).then(()=>{
        console.log('oke')
      }).catch((error)=>{
        console.log('loi: ',error);
      })
}