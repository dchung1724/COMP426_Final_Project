import axios from 'axios';
import { strict } from 'assert';
import { checkServerIdentity } from 'tls';



let username = 'jjwerner';
let password = 'password123';
let firstname = 'Jan';

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
    await axios.post("http://localhost:3000/user/recipe_pref", {data: {user_liked_recipes: liked_recipes, user_saved_recipes: saved_recipes}},{headers: { Authorization: Bearer + result.jwt }},);
    //console.log('hello');
    let getting_response = await axios.get("http://localhost:3000/user/recipe_pref", {headers: { Authorization: 'Bearer '+result.jwt}},).then(function (result) {
        return result;
    });
    console.log(getting_response.data.result);
    
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