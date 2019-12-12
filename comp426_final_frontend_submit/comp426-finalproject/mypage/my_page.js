let username = 'hyunc';
let password = 'password123';

const pubRoot = new axios.create({
  baseURL: "http://localhost:3000/public"
});

async function createRecipe({name = '', description = '', instructions = '', ingredients = '', created_by = '', num_likes = 0, recipe_id = '', picture = null}) {
    return await pubRoot.post('/recipes/'+'recipe_'+recipe_id, {
      data: {name, description, instructions, ingredients, created_by, num_likes, recipe_id, picture}
    })
}

async function get_recipe_db() {
    return await pubRoot.get('/recipes');
}

async function delete_recipe(id) {
    return await pubRoot.delete('/recipes/recipe_'+id);
  }

async function generate_recipes() {
    let $recipe_div = $('.Recipes');
    let $liked_div = $('.Liked_Recipes');
    let $saved_div = $('.Saved_Recipes');
    $recipe_div.empty();
    $liked_div.empty();
    $saved_div.empty();

    let {data} = await get_recipe_db();
    let recipes = data.result;
    //console.log(recipes)
    Object.keys(recipes).forEach(function (item) {
        //console.log(recipes[item]);
        let recipe_details = recipes[item];
        let name = recipe_details['name'];
        let desc = recipe_details['description'];
        let instructions = recipe_details['instructions'];
        let ingredients = recipe_details['ingredients'];
        let created_by = recipe_details['created_by'];
        let num_likes = recipe_details['num_likes'];
        let id = recipe_details['recipe_id'];
        let picture = recipe_details['picture'];
        let recipe_class = 'recipe'+id;
        console.log(created_by);
        if ((created_by == 'dchung1724') && ($('#'+recipe_class).length == 0)) {
            let recipe_obj =
            `<div class='recipe_obj' id=${recipe_class}>
                <img src=${picture}>
                <p class='name ${id}'>Recipe Name: ${name}</p>
                <p class='desc ${id}' id=${id}>Description: ${desc}</p>
                <p class='inst ${id}' id=${id}>Instructions: ${instructions}</p>
                <p class='ingr ${id}' id=${id}>Ingredients: ${ingredients}</p>
                <p class='created_by ${id}' id=${id}>Created By: ${created_by}</p>
                <p class='numlikes ${id}' id=${id}>Number of Likes: ${num_likes}</p>
                <button class="editbutton" id=${id} type="button">edit</button>
                <button class="deletebutton" id=${id} type="button">delete</button>
            </div>`
            $recipe_div.append(recipe_obj);
            
        }
    })
}

export const handleEditButtonPress = async function(event) {
    let recipeID = event.target.id.toString();
    let $myrecipe=$('#recipe'+recipeID);
    let {data} = await get_recipe_db();
    let recipes = data.result;
    console.log(recipes);
    let name_val = $("p.name."+recipeID).text().replace('Recipe Name: ', '');
    console.log(name_val);
    let desc_val = $("p.desc."+recipeID).text().replace('Description: ', '');
    console.log(desc_val);
    let inst_val = $("p.inst."+recipeID).text().replace('Instructions: ', '');
    console.log(inst_val);
    let ingr_val = $("p.ingr."+recipeID).text().replace('Ingredients: ', '');
    console.log(ingr_val);
    
    let recipe_edit_obj = 
    `<form class="edit ${recipeID}" id=${recipeID}>
        Recipe Name: <textarea class="edit name ${recipeID}" id=${recipeID}>${name_val}</textarea><br>
        Description: <textarea class="edit desc ${recipeID}" id=${recipeID}>${desc_val}</textarea><br>
        Instructions: <textarea class="edit inst ${recipeID}" id=${recipeID}>${inst_val}</textarea><br>
        Ingredients: <textarea class="edit ingr ${recipeID}" id=${recipeID}>${ingr_val}</textarea><br>
        <button class="cancelbutton" id=${recipeID} type="button">cancel</button>
        <input class="submitbutton" id=${recipeID} type="submit" value="Submit">
    </form>`
    $myrecipe.replaceWith(recipe_edit_obj);
    
};

export const handleSubmitButtonPress = async function(event) {
    event.preventDefault();
    
    let recipeID = event.target.id.toString();
    
    let {data} = await delete_recipe(recipeID);
    console.log(data)

    let $recipeEditForm = $('.edit.'+recipeID);
    let changed_name = $('.edit.name.'+recipeID).val();
    let changed_desc = $('.edit.desc.'+recipeID).val();
    console.log(changed_desc)
    let changed_inst = $('.edit.inst.'+recipeID).val();
    let changed_ingr = $('.edit.ingr.'+recipeID).val();
    let changed_ingr_list = changed_ingr.split(',');

    let {get_data} = await get_recipe_db();
    let recipes = get_data.result;
    Object.keys(recipes).forEach(function (item) {
        let recipe_details = recipes[item]
    
    })

    // NOTE: MAKE SURE TO CHANGE 'created_by' TO BE CORRECT USER DEPENDING ON JWT ON LOCAL STORAGE
    let update_recipe = await createRecipe({
        name: changed_name,
        description: changed_desc,
        instructions: changed_inst,
        ingredients: changed_ingr_list,
        created_by: 'dchung1724',
        num_likes: 0,
        recipe_id: recipeID
    });
    location.reload();
    
}

export const handleCancelButtonPress = async function(event) {
    location.reload();
}

export const handleDeleteButtonPress = async function(event) {
    let recipeID = event.target.id.toString();
    let {data} = await delete_recipe(recipeID);
    console.log(data);
    location.reload();
}

async function generate_liked_recipes() {
    let $recipe_div = $('.Recipes');
    let $liked_div = $('.Liked_Recipes');
    let $saved_div = $('.Saved_Recipes');
    $recipe_div.empty();
    $liked_div.empty();
    $saved_div.empty();

    let logging_in = go_login(username, password).then(async function(result) {
        check_status(result.jwt);
        let getting_response = await axios.get("http://localhost:3000/user/recipe_pref", {headers: { Authorization: 'Bearer '+result.jwt}},).then(function (result) {
            return result;
        });
        console.log(getting_response.data.result.user_liked_recipes);
        let liked_recipes = getting_response.data.result.user_liked_recipes;
        let saved_recipes = getting_response.data.result.user_saved_recipes;
        let {data} = await get_recipe_db();
        let recipes = data.result;
        liked_recipes.forEach(x => {
            console.log(x)
            let exists_value = 0;
            Object.keys(recipes).forEach(function (item) {
                let recipe_details = recipes[item];
                let id = recipe_details['recipe_id'];
                if (x == id) {
                    exists_value = 1;
                }
            })
            if (exists_value == 0) {
                console.log('here')
                let filtered_liked_recipes = liked_recipes.filter(item => item !== x)
                console.log(filtered_liked_recipes)
                let delete_function = async function() {
                    let deleting_recipe = await axios.post("http://localhost:3000/user/recipe_pref/", {data: {user_liked_recipes: filtered_liked_recipes, user_saved_recipes: saved_recipes}},{headers: { Authorization: `Bearer ` + result.jwt }},).then(function (result) {
                    return result;
                    })
                    console.log(deleting_recipe);
                    //location.reload();    
                }
                delete_function();
            }
        })
        Object.keys(recipes).forEach(function (item) {
            let recipe_details = recipes[item];
            let name = recipe_details['name'];
            let desc = recipe_details['description'];
            let instructions = recipe_details['instructions'];
            let ingredients = recipe_details['ingredients'];
            let created_by = recipe_details['created_by'];
            let num_likes = recipe_details['num_likes'];
            let id = recipe_details['recipe_id'];
            let picture = recipe_details['picture'];
            let recipe_class = 'recipe'+id;
            if (liked_recipes.includes(id) && $('#'+recipe_class).length == 0) {
                let recipe_obj =
                `<div class='recipe_obj' id=${recipe_class}>
                    <img src=${picture}>
                    <p class='name ${id}'>Recipe Name: ${name}</p>
                    <p class='desc ${id}' id=${id}>Description: ${desc}</p>
                    <p class='inst ${id}' id=${id}>Instructions: ${instructions}</p>
                    <p class='ingr ${id}' id=${id}>Ingredients: ${ingredients}</p>
                    <p class='created_by ${id}' id=${id}>Created By: ${created_by}</p>
                    <p class='numlikes ${id}' id=${id}>Number of Likes: ${num_likes}</p>
                    <button class="unlikebutton" id=${id} type="button">unlike</button>
                </div>`
                $liked_div.append(recipe_obj);
            }
        })
    })
}


async function go_login(user_name, pwd) {
    try {
        const response = await axios({
            method: 'POST',
            url: 'http://localhost:3000/account/login',
            data: {
                "name": user_name,
                "pass": pwd,
            }
        });
        return response.data;
    }
    catch(err) {
    }
}

async function check_status(jwt) {
    try {
        const response = await axios({
            method: 'GET',
            url: 'http://localhost:3000/account/status',
            headers: {
                "Authorization": "Bearer " + jwt
            }
        });
    }
    catch(err) {
    }
}


async function handleUnlikeButtonPress(event) {
    let logging_in = go_login(username, password).then(async function(result) {
        let getting_likes = async function() {
            let read_likes = await axios.get("http://localhost:3000/user/recipe_pref", {headers: { Authorization: 'Bearer '+result.jwt}},).then(function (result) {
                return result;
            });
            console.log(read_likes);
        }
        getting_likes();
    })
    /*
    let recipeID = event.target.id.toString();
    let {data} = await get_recipe_db();
    let recipes = data.result;
    let object_id = '';
    Object.keys(recipes).forEach(function (item) {
        let recipe_details = recipes[item]
        let id = recipe_details['recipe_id'];
        if (id == recipeID) {
            let name = recipe_details['name'];
            let desc = recipe_details['description'];
            let instructions = recipe_details['instructions'];
            let ingredients = recipe_details['ingredients'];
            let created_by = recipe_details['created_by'];
            let num_likes = recipe_details['num_likes'] - 1;
            let picture = recipe_details['picture'];
            let update_recipe = async function() {
                let update_likes = await createRecipe({
                    name: name,
                    description: desc,
                    instructions: instructions,
                    ingredients: ingredients,
                    created_by: created_by,
                    num_likes: num_likes,
                    recipe_id: id,
                    picture: picture
                })
                console.log(update_likes);
            }
            update_recipe();       
        }
    })
    let $liked_div = $('.Liked_Recipes');
    $liked_div.empty();
    let logging_in = go_login(username, password).then(async function(result) {
        check_status(result.jwt);
        let getting_response = await axios.get("http://localhost:3000/user/recipe_pref", {headers: { Authorization: 'Bearer '+result.jwt}},).then(function (result) {
            return result;
        });
        console.log(getting_response);
        let liked_recipes = getting_response.data.result.user_liked_recipes;
        let saved_recipes = getting_response.data.result.user_saved_recipes;
        let filtered_liked_recipes = liked_recipes.filter(item => item !== recipeID)
        console.log(filtered_liked_recipes);
        let deleting_recipe = await axios.post("http://localhost:3000/user/recipe_pref/", {data: {user_liked_recipes: filtered_liked_recipes, user_saved_recipes: saved_recipes}},{headers: { Authorization: `Bearer ` + result.jwt }},).then(function (result) {
            return result;
        });;

        console.log(deleting_recipe);
        //location.reload();

    })
    */

}


async function generate_saved_recipes() {
    let $recipe_div = $('.Recipes');
    let $liked_div = $('.Liked_Recipes');
    let $saved_div = $('.Saved_Recipes');
    $recipe_div.empty();
    $liked_div.empty();
    $saved_div.empty();

    let logging_in = go_login(username, password).then(async function(result) {
        check_status(result.jwt);
        let getting_response = await axios.get("http://localhost:3000/user/recipe_pref", {headers: { Authorization: 'Bearer '+result.jwt}},).then(function (result) {
            return result;
        });
        console.log(getting_response.data.result.user_saved_recipes);
        let liked_recipes = getting_response.data.result.user_liked_recipes;
        let saved_recipes = getting_response.data.result.user_saved_recipes;
        let {data} = await get_recipe_db();
        let recipes = data.result;
        saved_recipes.forEach(x => {
            console.log(x)
            let exists_value = 0;
            Object.keys(recipes).forEach(function (item) {
                let recipe_details = recipes[item];
                let id = recipe_details['recipe_id'];
                if (x == id) {
                    exists_value = 1;
                }
            })
            if (exists_value == 0) {
                console.log('here')
                let filtered_saved_recipes = saved_recipes.filter(item => item !== x)
                console.log(filtered_saved_recipes)
                let delete_function = async function() {
                    let deleting_recipe = await axios.post("http://localhost:3000/user/recipe_pref/", {data: {user_liked_recipes: liked_recipes, user_saved_recipes: filtered_saved_recipes}},{headers: { Authorization: `Bearer ` + result.jwt }},).then(function (result) {
                    return result;
                    })
                    console.log(deleting_recipe);
                    //location.reload();    
                }
                delete_function();
            }
        })

        Object.keys(recipes).forEach(function (item) {
            let recipe_details = recipes[item];
            let name = recipe_details['name'];
            let desc = recipe_details['description'];
            let instructions = recipe_details['instructions'];
            let ingredients = recipe_details['ingredients'];
            let created_by = recipe_details['created_by'];
            let num_likes = recipe_details['num_likes'];
            let id = recipe_details['recipe_id'];
            let picture = recipe_details['picture'];
            let recipe_class = 'recipe'+id;
            if (saved_recipes.includes(id) && $('#'+recipe_class).length == 0) {
                let recipe_obj =
                `<div class='recipe_obj' id=${recipe_class}>
                    <img src=${picture}>
                    <p class='name ${id}'>Recipe Name: ${name}</p>
                    <p class='desc ${id}' id=${id}>Description: ${desc}</p>
                    <p class='inst ${id}' id=${id}>Instructions: ${instructions}</p>
                    <p class='ingr ${id}' id=${id}>Ingredients: ${ingredients}</p>
                    <p class='created_by ${id}' id=${id}>Created By: ${created_by}</p>
                    <p class='numlikes ${id}' id=${id}>Number of Likes: ${num_likes}</p>
                    <button class="unsavebutton" id=${id} type="button">unsave</button>
                </div>`
                $saved_div.append(recipe_obj);
            }
        })
    })
}

async function handleUnsaveButtonPress(event) {
    let $saved_div = $('.Saved_Recipes');
    $saved_div.empty();
    let recipeID = event.target.id.toString();
    let logging_in = go_login(username, password).then(async function(result) {
        check_status(result.jwt);
        let getting_response = await axios.get("http://localhost:3000/user/recipe_pref", {headers: { Authorization: 'Bearer '+result.jwt}},).then(function (result) {
            return result;
        });
        console.log(getting_response.data.result.user_liked_recipes);
        let liked_recipes = getting_response.data.result.user_liked_recipes;
        let saved_recipes = getting_response.data.result.user_saved_recipes;
        let filtered_saved_recipes = saved_recipes.filter(item => item !== recipeID)
        console.log(filtered_saved_recipes);
        let deleting_recipe = await axios.post("http://localhost:3000/user/recipe_pref/", {data: {user_liked_recipes: liked_recipes, user_saved_recipes: filtered_saved_recipes}},{headers: { Authorization: `Bearer ` + result.jwt }},).then(function (result) {
            return result;
        });;

        console.log(deleting_recipe);
        location.reload();

    })

}

async function alertme(event) {
    console.log(event.target.id.toString());
}

async function generate_values() {
    let $mypagebox=$('.my_page_box');
    $mypagebox.on('click', "#recipebutton", generate_recipes);
    $mypagebox.on('click', ".editbutton", handleEditButtonPress);
    $mypagebox.on('click', ".submitbutton", handleSubmitButtonPress);
    $mypagebox.on('click', ".cancelbutton", handleCancelButtonPress);
    $mypagebox.on('click', ".deletebutton", handleDeleteButtonPress);
    $mypagebox.on('click', "#likedbutton", generate_liked_recipes);
    $mypagebox.on('click', ".unlikebutton", handleUnlikeButtonPress);
    $mypagebox.on('click', "#savedbutton", generate_saved_recipes);
    $mypagebox.on('click', ".unsavebutton", handleUnsaveButtonPress);
}


$(function() {
    generate_values();
});