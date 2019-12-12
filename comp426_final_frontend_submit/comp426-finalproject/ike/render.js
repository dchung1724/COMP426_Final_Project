async function createRecipe({name = '', description = '', instructions = '', ingredients = '', created_by = '', num_likes = 0, recipe_id = '', is_mine = false, picture = 'default.jpg'}) {
    return await pubRoot.post('/recipes/'+'recipe_'+recipe_id, {
      data: {name, description, instructions, ingredients, created_by, num_likes, recipe_id, is_mine, picture}
    })
  }

window.onload = function() {
    if(!window.location.hash) {
        window.location = window.location + '#loaded';
        window.location.reload();
    }
}
const pubRoot = new axios.create({
    baseURL: "http://localhost:3000/public"
  });
  
  async function createAuthor({name = '', description = '', instructions = '', ingredients=[], created_by = '', num_likes = 0, recipe_id = '', is_mine = false, picture = null}) {
    return await pubRoot.post('/recipes/'+'recipe_'+recipe_id, {
      data: {name, description, instructions, ingredients, created_by, num_likes, recipe_id, is_mine, picture}
    })
  }
  
  async function getAllAuthors() {
    return await pubRoot.get('/recipes');
  }
  

const getIngredients = async function() {
  let {data} = await getAllAuthors();
  let counter = 0;
  let list = [];
  let names = [];

  Object.keys(data).forEach(function (recipe) {
      Object.keys(data[recipe]).forEach(function (useless) {
        let recipeNum = "recipe_" + counter;
        names = names.concat(recipeNum);
        let currIngredients = data[recipe][names[counter]].ingredients;
        for(let i = 0; i < currIngredients.length; i++) {
          list = list.concat(currIngredients[i]);
        }
        counter++;
      });
      list = [...new Set(list)];
    });
    return list;
}

function debounce(func, wait, immediate) {
    var timeout;
    return function() {
        var context = this, args = arguments;
        var later = function() {
            timeout = null;
            if (!immediate) func.apply(context, args);
        };
        var callNow = immediate && !timeout;
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
        if (callNow) func.apply(context, args);
    };
};

let autocomplete = function(inp, arr) {
    /*the autocomplete function takes two arguments,
    the text field element and an array of possible autocompleted values:*/
    var currentFocus;
    /*execute a function when someone writes in the text field:*/
    inp.addEventListener("input", function(e) {
        var a, b, i, val = this.value;
        /*close any already open lists of autocompleted values*/
        closeAllLists();
        if (!val) { return false;}
        currentFocus = -1;
        /*create a DIV element that will contain the items (values):*/
        a = document.createElement("DIV");
        a.setAttribute("id", this.id + "autocomplete-list");
        a.setAttribute("class", "autocomplete-items");
        /*append the DIV element as a child of the autocomplete container:*/
        this.parentNode.appendChild(a);
        /*for each item in the array...*/
        for (i = 0; i < arr.length; i++) {
            /*check if the item starts with the same letters as the text field value:*/
            if (arr[i].substr(0, val.length).toUpperCase() == val.toUpperCase()) {
            /*create a DIV element for each matching element:*/
            b = document.createElement("DIV");
            /*make the matching letters bold:*/
            b.innerHTML = "<strong>" + arr[i].substr(0, val.length) + "</strong>";
            b.innerHTML += arr[i].substr(val.length);
            /*insert a input field that will hold the current array item's value:*/
            b.innerHTML += "<input type='hidden' value='" + arr[i] + "'>";
            /*execute a function when someone clicks on the item value (DIV element):*/
            b.addEventListener("click", function(e) {
                /*insert the value for the autocomplete text field:*/
                inp.value = this.getElementsByTagName("input")[0].value;
                /*close the list of autocompleted values,
                (or any other open lists of autocompleted values:*/
                closeAllLists();
            });
            a.appendChild(b);
            }
        }
    });
    /*execute a function presses a key on the keyboard:*/
    inp.addEventListener("keydown", function(e) {
        var x = document.getElementById(this.id + "autocomplete-list");
        if (x) x = x.getElementsByTagName("div");
        if (e.keyCode == 40) {
            /*If the arrow DOWN key is pressed,
            increase the currentFocus variable:*/
            currentFocus++;
            /*and and make the current item more visible:*/
            addActive(x);
        } else if (e.keyCode == 38) { //up
            /*If the arrow UP key is pressed,
            decrease the currentFocus variable:*/
            currentFocus--;
            /*and and make the current item more visible:*/
            addActive(x);
        } else if (e.keyCode == 13) {
            /*If the ENTER key is pressed, prevent the form from being submitted,*/
            e.preventDefault();
            if (currentFocus > -1) {
            /*and simulate a click on the "active" item:*/
            if (x) x[currentFocus].click();
            }
        }
    });
    function addActive(x) {
        /*a function to classify an item as "active":*/
        if (!x) return false;
        /*start by removing the "active" class on all items:*/
        removeActive(x);
        if (currentFocus >= x.length) currentFocus = 0;
        if (currentFocus < 0) currentFocus = (x.length - 1);
        /*add class "autocomplete-active":*/
        x[currentFocus].classList.add("autocomplete-active");
    }
    function removeActive(x) {
        /*a function to remove the "active" class from all autocomplete items:*/
        for (var i = 0; i < x.length; i++) {
        x[i].classList.remove("autocomplete-active");
        }
    }
    function closeAllLists(elmnt) {
        /*close all autocomplete lists in the document,
        except the one passed as an argument:*/
        var x = document.getElementsByClassName("autocomplete-items");
        for (var i = 0; i < x.length; i++) {
        if (elmnt != x[i] && elmnt != inp) {
            x[i].parentNode.removeChild(x[i]);
        }
        }
    }
    /*execute a function when someone clicks in the document:*/
    document.addEventListener("click", function (e) {
        closeAllLists(e.target);
    });
}

let ingres = getIngredients();
ingres.then(function(result) {
    autocomplete(document.getElementById("myInput"), result);
});

export const renderRecipeCards = async function() {
    let {data} = await getAllAuthors();
    let counter = 0;
    let html, name, id, desc, likes, picture;

    Object.keys(data).forEach(function (recipe) {
        Object.keys(data[recipe]).forEach(function (ueseless) {
            
            let recipeNum = "recipe_" + counter;
            
            name = data[recipe][recipeNum].name;
            id = data[recipe][recipeNum].recipe_id;
            desc = data[recipe][recipeNum].description;
            likes = data[recipe][recipeNum].num_likes;
            picture = data[recipe][recipeNum].picture;
            if(picture == null) {
                picture = '<img src="default.jpg" alt="Recipe Picture">'
            }


            html = `
            
            <div class="box" id="${id}">
                <a href='#' class="recipe-${id}-selector" id="${id}r">
                <div class="test" id="yo">
                <img src="${picture}" style="width:300px;height:300px;">
                <div class="name">Name: ${name}</div>
                <div class="description">Description: ${desc}</div>
                <button class="likeButton" id="${id}L">${likes} Likes</button>
                </div>
                </a>
            </div>
            <br>
            `

            
            $('#root').append(html);

            $('#root').on('click', '.recipe-'+id+'-selector', (e) => {
                let passedID = (e.currentTarget.id);
                moreDetails(passedID);
            })
            
            
            counter++;
        });
    });
}

export const handleLikeButtonPress = async function(event) {
    event.preventDefault();
    //update like counter

    let recipeId = event.id;
    let likes = recipeId.likes;


    
}

export const renderSearchBox = function() {
    let html = `
    <form autocomplete="off">
    <div class="autocomplete" style="width:300px;">
        <input id="myInput" type="text" name="myIngredients" placeholder="Search Ingredients">
    </div>
    <button class="searchButton" id="">Submit</button>
    </form>`
    $('#root').append(html);
}

export const handleSearchButtonPress = async function(event) {
    event.preventDefault();     //refine search results
    let ing = document.getElementById("myInput").value; 
    let {data} = await getAllAuthors();
    let counter = 0;
    let names = [];
    let hasIng = false;
    let myID, name, id, desc, likes, picture, html;
    Object.keys(data).forEach(function (recipe) {
      Object.keys(data[recipe]).forEach(function (useless) {
        let recipeNum = "recipe_" + counter;
        names = names.concat(recipeNum);
        let currIngredients = data[recipe][names[counter]].ingredients;
        for(let i = 0; i < currIngredients.length; i++) {
          if(ing == currIngredients[i]) {
            hasIng = true;
          }
        }
        if(hasIng) {
            myID = data[recipe][recipeNum].recipe_id;
            $('#'+myID.toString()).remove();

            name = data[recipe][recipeNum].name;
            id = data[recipe][recipeNum].recipe_id;
            desc = data[recipe][recipeNum].description;
            likes = data[recipe][recipeNum].num_likes;
            picture = data[recipe][recipeNum].picture;
            if(picture == null) {
                picture = '<img src="default.jpg" alt="Recipe Picture">'
            }            
            html = `
            <div class="box" id="${id}">
                <a href='#' class="recipe-${id}-selector" id="${id}r">
                <div class="test" id="yo">
                <img src="${picture}" style="width:300px;height:300px;">
                <div class="name">Name: ${name}</div>
                <div class="description">Description: ${desc}</div>
                <button class="likeButton" id="${id}L">${likes} Likes</button>
                </div>
                </a>
            </div>
            <br>
            `
            // $('#root').on('click', '.recipe-'+id+'-selector', (e) => {
            //     var search_r = $('a', this).attr('id');
            //     moreDetails(id);
            // })
            
            $('#root').append(html);

            $('#root').on('click', '.recipe-'+id+'-selector', (e) => {
                let passedID = e.currentTarget.id;
                moreDetails(passedID);
            })
   
        //    $('#root').on('click', '')
        } else if(!hasIng) {
            myID = data[recipe][recipeNum].recipe_id;
            $('#'+myID.toString()).remove();
        }
        counter++;
        hasIng = false;
      });
    });

}

export const handleRecipePress = async function(event) {
    event.preventDefault();
    //link to detailed recipe page
}

async function handleCommentButtonPress(event) {
    console.log(event.target.id.toString());
    let id = event.target.id.toString();
    let comment = $('.commentbox.'+id).val();
    let getting_comments = await axios.get("http://localhost:3000/private/recipes/recipe_"+id, {headers: { Authorization: 'Bearer '+localStorage.getItem('jwt')}},).then(function (result) {
        return result;
    });
    let previous_comments = getting_comments.data.result.comments;
    console.log(previous_comments);
    let next_num = '0';
    Object.keys(previous_comments).forEach(function (item) {
        let recipe_details = previous_comments[item]
        console.log(recipe_details);
        if (Number(recipe_details.comment_id) > Number(next_num)) {
            next_num = recipe_details.comment_id;
        }
    })
    next_num = (Number(next_num) + 1).toString()
    console.log(next_num);
    previous_comments['comment_'+next_num] = {
        comment_id: next_num,
        value: comment,
        created_by: localStorage.getItem('name')
    }

    console.log(previous_comments);

    await axios.post("http://localhost:3000/private/recipes/recipe_"+id+"/comments", {data: previous_comments},{headers: { Authorization: `Bearer ` + localStorage.getItem('jwt')}},);

    /*
    if (comment != "") {
        let sendable_data = {
            recipe_id: id,
            comments: 
        }
    }
    */

   location.reload();
    

}

export const loadIntoDOM = function() {
    const $root = $('#root');

    renderSearchBox();
    renderRecipeCards();

    $('#root').on('click', ".searchButton", handleSearchButtonPress);                               

    $('#root').on('click', ".likeButton", handleLikeButtonPress);   
    
    $('#root').on('click', ".box", handleRecipePress);

    $('#root').on('click', ".comment_button_submit", handleCommentButtonPress);
    
};


async function check_status(jwt) {
    try {
        const response = await axios({
            method: 'GET',
            url: 'http://localhost:3000/account/status',
            headers: {
                "Authorization": "Bearer " + jwt
            }
        });
        let row = $('.row');
        row.on('click', ".my-page-button", () => {
            window.location.replace('../mypage/mypage.html');
        });
        row.on('click', ".create-recipe-button", () => {
            window.location.replace('../ike/createRecipe.html');
        });
        $('.nav-bar').append(`
        <li><a href="#" onclick="signOut();"><button class="logout-button" onclick="signOut();" type="button">Log Out</button></a></li>
        <script>
        function onLoad() {
            gapi.load('auth2', function() {
              gapi.auth2.init();
            });
        }
        onLoad();
        function signOut() {
            var auth2 = gapi.auth2.getAuthInstance();
            auth2.signOut().then(function () {
              console.log('User signed out.');
            });
          }
        </script>
        `)
        $('.nav-bar').on('click', '.logout-button', () => {
            localStorage.removeItem('jwt');
            localStorage.removeItem('username');
            alert('Log Out Successful!')
            location.reload();
        })
    }
    catch(err) {
        let row = $('.row');
        row.on('click', ".my-page-button", () => {
            window.location.replace('../login/login.html');
        });
        row.on('click', ".create-recipe-button", () => {
            window.location.replace('../login/login.html');
        })
    }
}

function moreDetails(id) {
    $('#root').empty();
    let recipeID = id.substring(0,id.length - 1); 	
    console.log('passed ',recipeID);
    let recipes = getRecipes();
    let desiredRecipe;
    recipes.then( (object) => {
       Object.keys(object).forEach((item) => {
           let recipe = object[item];
           console.log(recipe.recipe_id, recipeID)
           if (recipe.recipe_id.toString() === recipeID) {
               desiredRecipe = recipe;
               console.log('it was defined here: ', desiredRecipe)
           }
       })
       console.log('the object selected is ',desiredRecipe);
       loadPage(desiredRecipe);

       
    })
    


}

let loadPage = function(recipe) {
    
    let str = '<p> <b>Ingredients:</b> <br></p> <ul class="ing">';
    console.log(recipe.ingredients);
    recipe.ingredients.forEach(function (i) {
        str += ('<p>' + i + '</p>');
    });
    str += '</ul>';

    let inst = recipe.instructions;
    let insts = `<hr><div class="instructions">
                        <span><b>Instructions: </b></span>
                        <p>${inst}</p>
                </div><hr>`;
                
    let clickedRecipe = `

    <div class="box" id="${recipe.recipe_id}">
            <div class="test" id="yo">
                <img src="${recipe.picture}" style="width:300px;height:300px;">
                <p id="author"><b>Created by:</b> ${recipe.created_by}</p>
                <div class="name"><b>Recipe Name: </b>${recipe.name}
                </div>
                <div class="description"><b>Description:</b>${recipe.description}</div>`
                + str +''+ insts + `
                <button class="likeButton" id="${recipe.recipe_id}L">${recipe.num_likes} Likes</button>
            </div>
            <div class="social">
            </div>
        
    </div>
        <br>
    `

    

    $("#root").append(clickedRecipe);
    loadSocial(recipe)
    $(".social").on('click', '#likeBtn', (event) => {
        let update_recipe = async function() {
            console.log(recipe.ingredients);
            let update_likes = await createRecipe({
                name: recipe.name,
                description: recipe.description,
                instructions: recipe.instructions,
                ingredients: recipe.ingredients,
                created_by: recipe.created_by,
                num_likes: recipe.num_likes+1,
                recipe_id: recipe.recipe_id,
                picture: recipe.picture
            })
        }
        update_recipe()



    

        
        let getting_likes = async function() {
            let read_likes = await axios.get("http://localhost:3000/user/recipe_pref/", {headers: { Authorization: 'Bearer '+ localStorage.getItem('jwt') }},).then(function (result) {
                console.log('result is ',result)
                return result;
            })
            console.log('readlikes is ' ,read_likes);
            console.log(read_likes.data.result);
            let liked_recipes = read_likes.data.result.user_liked_recipes;
            let saved_recipes = read_likes.data.result.user_saved_recipes;
            console.log(liked_recipes);
            console.log(recipe.recipe_id.toString());
            if (!liked_recipes.includes(recipe.recipe_id.toString())) {
                console.log('made it')
                liked_recipes.push(recipe.recipe_id);
            }
            console.log(liked_recipes);
        }    
        getting_likes();
        /*
        let update_likes = async function() {
            let likingUserRecipe = await axios.post("http://localhost:3000/user/recipe_pref/", {data: {user_liked_recipes: filtered_liked_recipes, user_saved_recipes: saved_recipes}},{headers: { Authorization: 'Bearer '+ localStorage.getItem('jwt') }},).then(function (result) {
                return result;
            })
        }
        update_likes()
        
        

        update_recipe();
        */
        
    })
    
}



const loadSocial = function(recipe) {
    let editButton = $(`<button class="button" id="editBtn"><i class="material-icons">edit</i></button>`);
    let deleteButton = $(`<button class="button" id="deleteBtn"><i class="material-icons">delete</i></button>`);
    let likeButton = $(`<button class="button" id="likeBtn"><i class="material-icons"></i>like</button>`);
    let unlikeButton = $(`<button class="button" id="unlikeBtn"><i class="material-icons"></i>unlike</button>`);
    let buttons = $(`<div class="btns"></div>`);
    if(recipe.created_by === localStorage.getItem('name')) {
        buttons.append(editButton,deleteButton);
        buttons.append(`<span><i class="material-icons">favorite</i>${recipe.num_likes}</span>`);
    } else {
        if(localStorage.getItem('jwt') !== null) {
            buttons.append(likeButton);
            buttons.append(unlikeButton);
        }
           
    }
    $('.social').append(buttons);
    loadComments(recipe);
}
const getRecipes = async function() {
    let {data} = await getAllAuthors();
    let recipes = data.result;
    return recipes;
  }



  const loadComments =  async function(recipe) { //displays comments
    event.preventDefault();
    const newComment = $(
            `<div class="comments_area" id=${recipe.recipe_id}>
            </div>
            <div class="comments_button_area" id=${recipe.recipe_id}>
                <div class="commForm">
                    <form class="modal-content">
                        <textarea class="commentbox ${recipe.recipe_id}" id="commText" placeholder="Add a comment."></textarea>
                        <button class="comment_button_submit" id=${recipe.recipe_id}>Submit</button>
                    </form>
                </div>
            </div>
    `);
    if (localStorage.getItem('jwt') !== null) {
        $('.social').append(newComment);
    }
    let id = recipe.recipe_id;
    let getting_comments = await axios.get("http://localhost:3000/private/recipes/recipe_"+id+"/comments", {headers: { Authorization: 'Bearer '+localStorage.getItem('jwt')}},).then(function (result) {
        return result.data.result;
    });
    let $comments_area = $('.comments_area');
    Object.keys(getting_comments).forEach(function (item) {
        let individual_comments = getting_comments[item];
        console.log(individual_comments);
        let comment_obj = 
        `<hr>
        <div class="individual_comments ${id}">
            <p class="value ${id}">Comment: ${individual_comments.value}</p>
            <p class="created_by ${id}">Created By: ${individual_comments.created_by}</p>
        </div>
        <hr>`
        $comments_area.append(comment_obj);
    
    })
    console.log(getting_comments);
    //location.reload();

    if(recipe.comments) {
        let arr = recipe.comments;
        console.log(arr);
        let counter = 0;
        arr.forEach(function(i) {
            newComment.append(prepComment(i));
            counter += 1;
        });
        $('.btns').append(`<span>${counter} Comments</span>`);
    }
    
}

const prepComment = function(c) {
    //let time = new Date(c.updatedAt).toLocaleString("en-US");
    const com = `<section class="comment" id="commentBox">                      
                            <div class="user">${c.created_by}</div>
                            <div class="content">
                                <p class="tbody">${c.text}</p>
                            </div>
                        </section>
    `;
    return com;
}







$(function() {
    check_status(localStorage.getItem('jwt'));
    loadIntoDOM();
});