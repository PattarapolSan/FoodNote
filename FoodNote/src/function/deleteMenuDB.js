import {getDatabase, ref, set} from '../config/FireBase';

const deleteMenuDB = (userId, date, index) => {
    const db = getDatabase();

    set(ref(db, `users/${userId}/lists/${date}/${index}`),null)
      
  }
export default deleteMenuDB;
