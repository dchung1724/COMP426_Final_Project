import axios from 'axios';
import { strict } from 'assert';

const pubRoot = new axios.create({
  baseURL: "http://localhost:3000/public"
});

async function createAuthor({name = '', description = '', instructions = '', ingredients = '', created_by = '', num_likes = 0, recipe_id = '', picture = "default.jpg"}) {
  return await pubRoot.post('/recipes/'+'recipe_'+recipe_id, {
    data: {name, description, instructions, ingredients, created_by, num_likes, recipe_id, picture}
  })
}

async function getAllAuthors() {
  return await pubRoot.get('/recipes');
}

async function delete_recipe() {
  return await pubRoot.delete('/recipes/recipe_0');
}

(async () => {
  await createAuthor({
    name: "Orange Cupcake",
    description: "I baked it and used orange dye",
    instructions: "use orange dye not red dye",
    ingredients: ["Orange Dye", "eggs", "flour"],
    created_by: 'Ike Mango',
    num_likes: 10,
    recipe_id: '0',
    picture: 'https://www.lifeloveandsugar.com/wp-content/uploads/2018/03/Orange-Cream-Cupcakes4.jpg'
  });
  await createAuthor({
    name: "Red Cupcake",
    description: "I baked it and used red dye",
    instructions: "use red dye not blue dye",
    ingredients: ["Red Dye", "eggs", "flour"],
    created_by: 'Minkyu Jeon',
    num_likes: 10,
    recipe_id: '1'
  });
  await createAuthor({
    name: "Blue Cupcake",
    description: "I baked it and used blue dye",
    instructions: "use blue dye not yellow dye",
    ingredients: ["Blue Dye", "eggs", "flour"],
    created_by: 'Runze Zhang',
    num_likes: 10,
    recipe_id: '2'
  });
  await createAuthor({
    name: "Yellow Cupcake",
    description: "I baked it and used yellow dye",
    instructions: "use yellow dye not orange dye",
    ingredients: ["Yellow Dye", "eggs", "flour"],
    created_by: 'David Chung',
    num_likes: 10,
    recipe_id: '3'
  });
  await createAuthor({
    name: "Yellow Cupcake",
    description: "I baked it and used yellow dye",
    instructions: "use yellow dye not orange dye",
    ingredients: ["Yellow Dye", "eggs", "flour"],
    created_by: 'dchung1724',
    num_likes: 4,
    recipe_id: '3'
  });
  await createAuthor({
    name: "Black Cupcake",
    description: "I baked it and used black dye",
    instructions: "use black dye not yellow dye",
    ingredients: ["Black Dye", "eggs", "flour"],
    created_by: 'dchung1724',
    num_likes: 2,
    recipe_id: '4'
  });

  //let {data} = await delete_recipe();
  //console.log(data)

  let {data} = await getAllAuthors();
  console.log(data)
})();