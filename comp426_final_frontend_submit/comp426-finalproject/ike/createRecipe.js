

const pubRoot = new axios.create({
    baseURL: "http://localhost:3000/public"
  });
  
  async function createAuthor({name = '', description = '', instructions = '', ingredients=[], created_by = '', num_likes = 0, recipe_id = '', is_mine = false, picture = null}) {
    return await pubRoot.post('/recipes/'+ 'recipe_'+recipe_id , {
      data: {name, description, instructions, ingredients, created_by, num_likes, recipe_id, is_mine, picture}
    })
  }
  
  async function getAllAuthors() {
    return await pubRoot.get('/recipes');
  }
  
  
  export const getID = async function() {
      let counter = 0;
      let {data} = await getAllAuthors();
      Object.keys(data).forEach(function (recipe) {
          Object.keys(data[recipe]).forEach(function (ueseless) {
              counter++;
          });
      });
      return counter;
  }
  
  export const renderCreateForm = function() {  
      let html = `
          <form>
              <ul class="form-style-1">
                  <li>
                      <label>Recipe Name <span class="required">*</span></label>
                      <input id="name" name="field3" class="field-long" />
                  </li>
                  <li>
                      <label>Description <span class="required">*</span></label>
                      <textarea id="desc" name="field5" id="field5" class="field-long field-textarea"></textarea>
                  </li>
                  <li>
                      <label>Image <span></span></label>
                      <input id="picture" placeholder="Image url" name="field3" class="field-long" />
                  </li>
                  <li>
                      <label>Ingredients <span class="required">*</span></label>
                          <input id="ingredients" type="email" name="field3" placeholder="Separated by Commas" class="field-long" />
                  </li>
                  <li>
                      <label>Instructions <span class="required">*</span></label>
                      <textarea id="instructions" name="field5" id="field5" class="field-long field-textarea"></textarea>
                  </li>
                  <li>
                      <input class="submitButton" type="button" value="Submit" />
                  </li>
              </ul>
          </form>`
  
      $('#root').append(html);
      $('#root').on('click', ".submitButton", handleSubmit);   
  }
  
  export const handleSubmit = async function() {
      let myName = document.getElementById("name").value;
      let myDesc = document.getElementById("desc").value;
      let myInstructions = document.getElementById("instructions").value;
      let myIngredients = document.getElementById("ingredients").value;
      let myPicture = document.getElementById("picture").value;
      console.log(myPicture);
      if (myPicture == ""){
          myPicture = 'default.jpg';
      }
      let myID = getID();
      myID.then( (object) => {
            let ingredientArray = myIngredients.split(", ");
            console.log(ingredientArray);
            let currentUser = localStorage.getItem('name');
            createAuthor({
            name: myName,
            description: myDesc,
            instructions: myInstructions,
            ingredients: ingredientArray,
            created_by: currentUser, //this needs jwt
            num_likes: 0,
            recipe_id: object,
            is_mine: true,
            picture: myPicture
          });
         })
    window.location = 'http://localhost:5500/comp426-finalproject/ike/index.html#loaded'
  }
  
  renderCreateForm();
  

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
            location.replace('../homepage/homepage.html');
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

check_status(localStorage.getItem('jwt'));