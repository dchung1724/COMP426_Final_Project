
async function create_acc(user_name, pwd) {
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
        alert("Now that you're registered, please log in!");
        window.location.replace("../login/login.html");
        return response.data;
    }
    catch(err) {
        console.log(err);
        alert("Username is taken. Please try an another username.")
    }
        
  }
  
  
  
  
  async function get_info(event) {
    let username = $('.username-field').val();
    let password = $('.password-field').val();
    create_acc(username, password);

  }
  
  
  
  
  
  async function run_createacc() {
    let $entrybox = $('.example');
    $entrybox.on('click', ".register-button", get_info);
    
  }
  
  
  
  $(function() {
    run_createacc();
  });