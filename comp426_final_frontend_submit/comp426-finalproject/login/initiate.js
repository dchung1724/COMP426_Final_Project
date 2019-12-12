
import axios from 'axios';
import { strict } from 'assert';
import { checkServerIdentity } from 'tls';


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

create_acc(username, password, firstname).then(function(result){
    console.log(result);
});