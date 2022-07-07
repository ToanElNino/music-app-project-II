import { db } from "../../../firebase";
import { set, ref, getDatabase, onValue } from 'firebase/database';

function guidGenerator() {
    var S4 = function() {
       return (((1+Math.random())*0x10000)|0).toString(16).substring(1);
    };
    return (S4()+S4()+"-"+S4()+"-"+S4()+"-"+S4()+"-"+S4()+S4()+S4());
  }

export async function GetFavoriteId(){
    onValue(ref(db, 'favoriteId/'+ '8de663f0-667e-75a0-29d5-4fb0d578bce0'), (snapshot) => {
        const data = snapshot.val();
        console.log(data);
    })
}
export async function UpdateFavoriteId(curId){
    console.log('call update favorite id');
    set(ref(db, 'favoriteId/' + guidGenerator()),{
        id: curId + 1,
      }).then(()=>{
        console.log('oke')
      }).catch((error)=>{
        console.log('loi: ',error);
      })
}