
const pubRoot = new axios.create({
  baseURL: "http://localhost:3000/public"
});

async function createAuthor({name = '', description = '', instructions = '', created_by = '', num_likes = 0, recipe_id = '', is_mine = false, picture = null}) {
  return await pubRoot.post('/recipes/'+'recipe_'+recipe_id, {
    data: {name, description, instructions, created_by, num_likes, recipe_id, is_mine, picture}
  })
}

async function getAllAuthors() {
  return await pubRoot.get('/recipes');
}

(async () => {
    let {data} = await getAllAuthors();
    // Create array of recipe objects.
    let recipes = (data.result);
    // console.log(typeof(recipes))

    recipes = Object.keys(recipes).map(key => ({id: key, info: recipes[key]}));


    // Create empty like array, put all the numbers in and get rid of it. 
    let likes = [];
    let MostLikes = [];
    recipes.forEach(recipe => {
        likes.push(recipe.info.num_likes);
    })
    console.log('likes array: ',likes);
    let length = likes.length;
    // Fill MostLikes with the likes in descending order. 
    for (let i = 0; i < length; ++i) {
        if (likes[i] === Math.max.apply(Math, likes)) {
            if (MostLikes.length < 3) {
                MostLikes.push(likes[i]);
                likes.splice(i--, 1);
            }
       }
    }
    console.log('most likes: ',MostLikes)

    let featuredItems = [];

    
        for (let i = 0; i < MostLikes.length; i++) {
            if (featuredItems.length < 3) {
                for (let j = 0; j < recipes.length; j++) {
                    if (MostLikes[i] === recipes[j].info.num_likes && featuredItems.length < 3) {
                        featuredItems.push(recipes[j]);
                    }
                }
            }
        }
        console.log(featuredItems, ' are featured')


        // let result = recipes.filter(recipe => {
        // if (recipe.info.num_likes === MostLikes[i]) {
        //     console.log('thisran')
        //     if (featuredItems < 3) {
        //         featuredItems.push(recipe);
        //    }
        // }

    // console.log(likes)
    // console.log(MostLikes);
    console.log('featured items: ',featuredItems);

    featuredItems.forEach(recipe => {
        let htmlPictureElt;
        if (recipe.info.picture === "") {
            htmlPictureElt = '<img src="styles/default.jpg" alt="Recipe Picture">';
        }
        else {
            htmlPictureElt =  '<img src="' + recipe.info.picture + '" alt="Recipe Picture" width="240" height="260">';
        }
        $('.featured-recipes').append(
            `
                <div class="recipe ${recipe.info.recipe_id}">
                    <figure>
                    ${htmlPictureElt}
                    </figure>
                    <p class="recipe-name">${recipe.info.name}</p>
                </div>`)
        })
  
  
  
})();

// adds a functionality to button for find recipe
let findRecipe = $('.row');
        findRecipe.on('click', ".find-recipe-button", () => {
        window.location.replace('../ike/index.html');
});



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
            localStorage.removeItem('name');
            
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


// async function createRecipe(jwt) {
//     try {
//         const response = await axios({
//             method: 'GET',
//             url: 'http://localhost:3000/account/status',
//             headers: {
//                 "Authorization": "Bearer " + jwt
//             }
//         });
//         let row = $('.row');
//         row.on('click', ".create-recipe-button", () => {
//             window.location.replace('../ike/createRecipe.html');
//         });
//         $('.nav-bar').append(`
//             <li><button class="logout-button" type="button">Log Out</button></li>
//         `)
//         $('.nav-bar').on('click', '.logout-button', () => {
//             localStorage.removeItem('jwt');
//             localStorage.removeItem('username');
//             alert('Log Out Successful!')
//             location.reload();
//         })
//     }
//     catch(err) {
//         let row = $('.row');
//         row.on('click', ".my-page-button", () => {
//             window.location.replace('../login/login.html');
//         });

//     }
// }

check_status(localStorage.getItem('jwt'));

$('.nav-bar').on('click', '.home-button', () => {
    window.location.replace('../homepage/homepage.html');
})

// let row = $('.row');


// const privRoot = new axios.create({
//     baseURL: "http://localhost:3000/private"
// });

// async function test({name = '', description = '', instructions = '', created_by = '', num_likes = 0, recipe_id = '', is_mine = false, picture = null}) {
//     return await privRoot.post('/recipes/'+'recipe_'+recipe_id, {
//         data: {name, description, instructions, created_by, num_likes, recipe_id, is_mine, picture}
//     })
// }

// (async () => {
//     await test({
//       name: "Orange Cupcake",
//       description: "I baked it and used orange dye",
//       instructions: "use orange dye not red dye",
//       created_by: 'Ike Mango',
//       num_likes: 0,
//       recipe_id: '0',
//       is_mine: false
//     });
//     await test({
//       name: "Red Cupcake",
//       description: "I baked it and used red dye",
//       instructions: "use red dye not blue dye",
//       created_by: 'Minkyu Jeon',
//       num_likes: 0,
//       recipe_id: '1',
//       is_mine: false
//     });
//     await test({
//       name: "Blue Cupcake",
//       description: "I baked it and used blue dye",
//       instructions: "use blue dye not yellow dye",
//       created_by: 'Runze Zhang',
//       num_likes: 0,
//       recipe_id: '2',
//       is_mine: false
//     });
//     await test({
//       name: "Yellow Cupcake",
//       description: "I baked it and used yellow dye",
//       instructions: "use yellow dye not orange dye",
//       created_by: 'David Chung',
//       num_likes: 0,
//       recipe_id: '3',
//       is_mine: true
//     });
//     let {data} = await getAllAuthors();
//     console.log(data)
// })();

console.log('Bearer ' + localStorage.getItem('jwt'));
// axios.post("http://localhost:3000/private/fav/", {data: 123},{headers: { Authorization: `Bearer ${localStorage.getItem('jwt')}` }},
//     )
//     .then(res => console.log(res))
//     .catch(err => console.log(err));


// axios({
//     method: 'POST',
//     url: 'http://localhost:3000/private/fav/',
//     'data': {
//         'name': 'fred'
//     },
//     'headers': {
//         'Authorization': 'Bearer ' + localStorage.getItem('jwt')
//     }
// });


// -----------------------ALDFLSADKFJLSADKFSLDF-----------------



    // console.log('hi');

// async function check_statusPrivate(jwt) {
//     try {
//         console.log(jwt)
//         const response = await axios({
//             method: 'POST',
//             url: 'http://localhost:3000/private/wewe',
//             data: {
//                 "name": 'fred'
//             },
//             headers: {
//                 "Authorization": "Bearer " + jwt
//             }
//         });
//         console.log(response.data)
//     }
//     catch(err) {
//         console.log(err)
//     }
// }

// check_statusPrivate(localStorage.getItem('jwt'));