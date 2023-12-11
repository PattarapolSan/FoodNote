import {getDatabase, ref, get, set } from '../config/FireBase';

const addMenuToDB = (userId, title, date, ingredientsList, calories) => {
  return new Promise((resolve, reject) => {
    let listId = 0;
    const db = getDatabase();
    const dateOnly = date.toISOString().split('T')[0];

    get(ref(db, `users/${userId}/lists/${dateOnly}`)).then((snapshot) => {
      if (snapshot.exists()) {
        const numberOfMenus = snapshot;
        listId = Object.keys(numberOfMenus.val()).length;
      }

      set(ref(db, `users/${userId}/lists/${dateOnly}/${listId}`), {
        title: title,
        ingredients: ingredientsList,
        calories: calories,
      })
        .then(() => {
          resolve(); // Resolve the promise when the data is successfully added
        })
        .catch((error) => {
          reject(error); // Reject the promise if there's an error
        });
    });
  });
};

export default addMenuToDB;
