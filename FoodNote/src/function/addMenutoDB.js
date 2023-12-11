import { app, getDatabase, ref, get, push, set } from '../config/FireBase';


const addMenuToDB = (userId, title, date, ingredientsList, calories) => {
  let listId = 0;
  const db = getDatabase();
  const dateOnly = date.toISOString().split('T')[0]


  get(ref(db, `users/${userId}/lists/${dateOnly}`)).then((snapshot)=> {
    if(snapshot.exists()) {
      const numberOfMenus = snapshot;
      console.log('Number of menus:', Object.keys(numberOfMenus.val()).length);
      listId = Object.keys(numberOfMenus.val()).length
      console.log(listId)
    }

    set(ref(db, `users/${userId}/lists/${dateOnly}/${listId}`), {
      title: title,
      ingredients: ingredientsList,
      calories: calories
    });
  })

  
 

};

export default addMenuToDB;