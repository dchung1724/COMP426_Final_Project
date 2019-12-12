/*
import axios from 'axios';
import { strict } from 'assert';
import { checkServerIdentity } from 'tls';
*/


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
        console.log(err);
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

let jwt = ''

go_login(username, password).then(function(result) {
    jwt = result.jwt;
    //localStorage.setItem("jwtCookie", jwt)
    //console.log(jwt)
    check_status(jwt);
});

//console.log(localStorage.getItem("jwtCookie"));

async function check_status(jwt) {
    try {
        console.log(jwt)
        const response = await axios({
            method: 'GET',
            url: 'http://localhost:3000/account/status',
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