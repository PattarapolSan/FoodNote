import { app, getDatabase, ref, get, push, set } from '../config/FireBase';


const setUserCalories = (userId, calorie) => {
  const db = getDatabase();

set(ref(db, `users/${userId}`), {
      calorieGoal: calorie,
});

};

export default setUserCalories;