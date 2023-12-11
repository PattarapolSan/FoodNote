import { getDatabase, ref, get } from '../config/FireBase';

const getListItems = async (userId) => {
  const db = getDatabase();

  try {
    const snapshot = await get(ref(db, `users/${userId}/lists`));

    if (snapshot.exists()) {
      return snapshot.val();
    } else {
      console.log('Menu lists not found for user:', userId);
      return null; // or any default value you want to return
    }
  } catch (error) {
    console.error('Error fetching Menu lists:', error.message);
    throw error;
  }
};

export default getListItems;
