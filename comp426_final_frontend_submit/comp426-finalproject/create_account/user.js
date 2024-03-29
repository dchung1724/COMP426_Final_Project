
import axios from 'axios';
import { strict } from 'assert';
import { checkServerIdentity } from 'tls';

let sendable_data = {
    recipe_0: {
        recipe_id: "0",
        comments: {
            comment_0: {
                comment_id: "0",
                value: "this was delicious",
                created_by: "hyunc"
            },
            comment_1: {
                comment_id: "1",
                value: "fabulous!",
                created_by: "maxjeon"
            },
            comment_2: {
                comment_id: "2",
                value: "A must try recipe!",
                created_by: "ike"
            }
        }
    },
    recipe_1: {
        recipe_id: "1",
        comments: {
            comment_0: {
                comment_id: "0",
                value: "this was okay",
                created_by: "hyunc"
            },
            comment_1: {
                comment_id: "1",
                value: "pretty good!",
                created_by: "maxjeon"
            },
            comment_2: {
                comment_id: "2",
                value: "Might try again!",
                created_by: "ike"
            }
        }
    },
    recipe_2: {
        recipe_id: "2",
        comments: {
            comment_0: {
                comment_id: "0",
                value: "yikes",
                created_by: "hyunc"
            },
            comment_1: {
                comment_id: "1",
                value: "not good!",
                created_by: "maxjeon"
            },
            comment_2: {
                comment_id: "2",
                value: "don't make thi!",
                created_by: "ike"
            }
        }
    }
}

let username = 'hyunc';
let password = 'password123';
let firstname = 'David';

async function create_acc(user_name, pwd, f_name) {
    try{
        const response = await axios({
            method: 'POST',
            url: 'http://localhost:3000/account/create',
            data: {
                "name": user_name,
                "pass": pwd,
                "data": {
                    "role": 2,
                    "description": "Laxy..."
                }
            }
        });
        return response.data;
    }
    catch(err) {
        //console.log(err);
    }
        
}
/*
create_acc(username, password, firstname).then(function(result){
    console.log(result);
});
*/




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
        //console.log(response)
        return response.data;
    }
    catch(err) {
        //console.log(err)
    }
}

let logging_in = go_login(username, password).then(async function(result) {
    //console.log(result)
    //localStorage.setItem("jwtCookie", jwt)
    //console.log(result.jwt);
    check_status(result.jwt);
    let liked_recipes = ['0', '2', '4'];
    let saved_recipes = ['1', '3'];
    await axios.post("http://localhost:3000/user/recipe_pref", {data: {user_liked_recipes: liked_recipes, user_saved_recipes: saved_recipes}},{headers: { Authorization: `Bearer ` + result.jwt }},);
    //console.log('hello');
    let getting_response = await axios.get("http://localhost:3000/user/recipe_pref", {headers: { Authorization: 'Bearer '+result.jwt}},).then(function (result) {
        return result;
    });
    console.log(getting_response.data.result);

    await axios.post("http://localhost:3000/private/recipes", {data: sendable_data},{headers: { Authorization: `Bearer ` + result.jwt}},);
    
});

//console.log(localStorage.getItem("jwtCookie"));

async function check_status(jwt) {
    try {
        //console.log(jwt)
        const response = await axios({
            method: 'GET',
            url: 'http://localhost:3000/account/status',
            headers: {
                "Authorization": "Bearer " + jwt
            }
        });
        //console.log(response.data)
    }
    catch(err) {
        //console.log(err)
    }
}



/*
async function check_statusPrivate(jwt) {
    try {
        console.log(jwt)
        const response = await axios({
            method: 'POST',
            url: 'http://localhost:3000/private/recipes',
            data: {
                recipe_0: {
                    recipe_id: "0",
                    comments: {
                        comment_0: {
                            comment_id: "0",
                            value: "this was delicious",
                            created_by: "hyunc"
                        },
                        comment_1: {
                            comment_id: "1",
                            value: "fabulous!",
                            created_by: "maxjeon"
                        },
                        comment_2: {
                            comment_id: "2",
                            value: "A must try recipe!",
                            created_by: "ike"
                        }
                    }
                },
                recipe_1: {
                    recipe_id: "1",
                    comments: {
                        comment_0: {
                            comment_id: "0",
                            value: "this was okay",
                            created_by: "hyunc"
                        },
                        comment_1: {
                            comment_id: "1",
                            value: "pretty good!",
                            created_by: "maxjeon"
                        },
                        comment_2: {
                            comment_id: "2",
                            value: "Might try again!",
                            created_by: "ike"
                        }
                    }
                },
                recipe_2: {
                    recipe_id: "2",
                    comments: {
                        comment_0: {
                            comment_id: "0",
                            value: "yikes",
                            created_by: "hyunc"
                        },
                        comment_1: {
                            comment_id: "1",
                            value: "not good!",
                            created_by: "maxjeon"
                        },
                        comment_2: {
                            comment_id: "2",
                            value: "don't make thi!",
                            created_by: "ike"
                        }
                    }
                }
            },
            headers: {
                "Authorization": "Bearer " + jwt
            }
        });
        console.log(response.data)
    }
    catch(err) {
        console.log(err)
    }
}


async function check_statusPrivate(jwt) {
    try {
        console.log(jwt)
        const response = await axios({
            method: 'POST',
            url: 'http://localhost:3000/private/wewe',
            data: {
                "name": 'fred'
            },
            headers: {
                "Authorization": "Bearer " + jwt
            }
        });
        console.log(response.data)
    }
    catch(err) {
        console.log(err)
    }
}

*/

