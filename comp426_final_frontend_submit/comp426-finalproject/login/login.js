

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
        alert('Login Successful!');
        window.location.replace('../mypage/mypage.html');
        return response.data;
    }
    catch(err) {
        alert('Login Failed. Try re-entering your credentials. If you are a new user please register before attempting to login!');
}
}

let field = $('.example');

field.on('click', ".login-button", () => {
    let username = document.querySelector('.username-field').value;
    let password = document.querySelector('.password-field').value;
    console.log('username is: ' + document.querySelector('.username-field').value);
    console.log('password is : ' + document.querySelector('.password-field').value);
    go_login(username, password).then((object) =>{
        let jwt = object.jwt;
        let username = object.name;
        localStorage.setItem('jwt', jwt);
        localStorage.setItem('name', username);
    });
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

// function onSignIn(googleUser) {
//     var profile = googleUser.getBasicProfile();
//     console.log('ID: ' + profile.getId()); // Do not send to your backend! Use an ID token instead.
//     console.log('Name: ' + profile.getName());
//     console.log('Image URL: ' + profile.getImageUrl());
//     console.log('Email: ' + profile.getEmail()); // This is null if the 'email' scope is not present.
// }


// go_login(username, password).then(function(result) {
//     jwt = result.jwt;
//     localStorage.setItem("jwtCookie", jwt)
//     console.log(jwt)
//     // check_status(jwt);
// });