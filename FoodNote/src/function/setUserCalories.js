import { getDatabase, ref, set } from '../config/FireBase';

const setUsersCalories = (userId, calories) => {
  const db = getDatabase();




    set(ref(db, `users/${userId}/caloriesGoal`), {
      calories: calories
    });


  
 

};

export default setUsersCalories;
