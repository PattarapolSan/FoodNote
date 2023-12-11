import { getDatabase, ref, get } from '../config/FireBase';

const getUsersCalories = async (userId) => {
  const db = getDatabase();

  try {
    const snapshot = await get(ref(db, `users/${userId}/caloriesGoal`));

    if (snapshot.exists()) {
      return snapshot.val().calories;
    } else {
      console.log('Calories goal not found for user:', userId);
      return null; 
    }
  } catch (error) {
    console.error('Error fetching calories goal:', error.message);
    throw error;
  }
};

export default getUsersCalories;
