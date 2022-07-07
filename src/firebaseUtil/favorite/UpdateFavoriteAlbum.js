import { db } from "../../../firebase";
import { set, ref, getDatabase, onValue } from 'firebase/database';

export async function UpdateFavoriteAlbum({nextId,list}){
    console.log('call update favorite album');
    console.log(nextId);
    console.log(list);
    set(ref(db, 'favoriteAlbum/' + nextId),{
        owner_id: nextId,
        songs: list,
      }).then(()=>{
        console.log('oke')
      }).catch((error)=>{
        console.log('loi: ',error);
      })
}