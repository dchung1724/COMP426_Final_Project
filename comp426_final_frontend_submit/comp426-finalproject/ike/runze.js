


export const setHeader = function() {
    var header = $('.head');
    if($(window).scrollTop() > 91) {
        header.addClass('scrolled');
    } else {
        header.removeClass('scrolled');
    }
}

export const newRecipe = async function() {  //get single recipe by id
    let {data} = await getAllAuthors();
    let recipe = data.result.recipe_3;
    loadInfo(recipe), loadPage(recipe), loadSocial(recipe);
    //loadNutrition(recipe);
}

export const loadInfo = function(recipe) {
    //let time = new Date(recipe.updatedAt).toLocaleString("en-US"); //<p id="date">${time}</p>
    if (recipe.picture){
        $('.home').css('background-image', `url(${recipe.picture})`);
    }
    let home = `<div class="home_container">
                    <div class="container">
                        <div class="row">
                            <div class="col">
                                <p id="name">${recipe.name}</p>
                                <p id="author">${recipe.created_by}</p>
                                
                            </div>
                        </div>
                    </div>
                </div>
    `;
    $('.home').append(home);
}

export const loadPage = function(recipe) {
    let desc = `<div class='desc'>${recipe.description}</div>`;

    let ingred = recipe.ingredients;
    let str = '<ul class="ing">';
    ingred.forEach(function (i) {
        console.log(i);
        str += ('<li>' + i + '</li>');
    });
    str += '</ul>';
    console.log(str);
    let ingreds = `<hr><div class="ingred">
                        <span>Ingredients</span>
                        <div>${str}</div>
                </div>`;

    let inst = recipe.instructions;
    let insts = `<hr><div class="instructions">
                        <span>Instructions</span>
                        <p>${inst}</p>
                </div><hr>`;
    $(".recipe-content").append(desc,ingreds,insts);
}

export const loadNutrition = async function(recipe) {
    event.preventDefault;
    console.log(recipe.ingredients);
    let list = recipe.ingredients.join("\n");
    console.log(list);
    const result = await axios({
        method: 'post',
        url: 'https://api.spoonacular.com/recipes/visualizeIngredients'+key,
        ingredientList: list,
        servings: "2"
    });
    console.log(result);
    console.log(result.data);
    $('.recipe-content').append(`<div class="widget">${result.data}</div>`);
}

export const loadSocial = function(recipe) {
    let editButton = $(`<button class="button" id="editBtn"><i class="material-icons">create</i></button>`);
    let deleteButton = $(`<button class="button" id="deleteBtn"><i class="material-icons">delete</i></button>`);
    let likeButton = $(`<button class="button" id="likeBtn"><i class="material-icons">favorite</i>${recipe.num_likes}</button>`);
    let unlikeButton = $(`<button class="button" id="unlikeBtn"><i class="material-icons">favorite_border</i>${recipe.num_likes}</button>`);
    let buttons = $(`<div class="btns"></div>`);
    if(recipe.is_mine) {
        buttons.append(editButton,deleteButton);
        buttons.append(`<span><i class="material-icons">favorite</i>${recipe.num_likes}</span>`);
    } else {
        if(recipe.num_likes > 0) {
           buttons.append(likeButton);
        } else {
            buttons.append(unlikeButton);
        }
    }
    $('.social').append(buttons);
    loadComments(recipe);
}

export 


export const prepComment = function(c) {
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

export const handleCommentButton = async function(event) {
    event.preventDefault();
    const r = $(event.currentTarget).parent().parent();
    let comm = r.children().children("#replyText");
    console.log(r);
    const id = $(event.currentTarget).attr('tweet');
    console.log(id);
    const body = a.val();

    // const result = await axios({
    //     method: 'post',
    //     url: 'https://comp426fa19.cs.unc.edu/a09/tweets',
    //     withCredentials: true,
    //     data: {
    //       "type": "reply",
    //       "parent": id,
    //       "body": ""+body
    //     },
    //   });
}

export const handleEditButton = async function(event) { //opens edit window

}

export const handleEditSubmit = async function(event) { //submit changes

}

export const handleDeleteButton = async function(event) { //deletos
    event.preventDefault();
    const id = $(event.currentTarget).parent().parent().attr('tweet');

    const result = await axios({
        method: 'delete',
        url: `https://comp426fa19.cs.unc.edu/a09/tweets/${id}`,
        withCredentials: true,
    });
    refresh();
}

export const handleLikeButton = async function(event) { 
    event.preventDefault();
    const id = $(event.currentTarget).parent().parent().attr('tweet');

    const result2 = await axios({
        method: 'get',
        url: `https://comp426fa19.cs.unc.edu/a09/tweets/${id}`,
        withCredentials: true,
    });
    const result = await axios({
        method: 'put',
        url: `https://comp426fa19.cs.unc.edu/a09/tweets/${id}/like`,
        withCredentials: true,
    });

    let likes = result2.data.likeCount + 1;
    let likeButton =`<button class="button" id="likeBtn"><i class="material-icons">favorite</i><span>${likes}</span></button>`;
    let cur = $(event.currentTarget)[0];
    cur.outerHTML = likeButton;
}

export const handleUnlikeButton = async function(event) { 
    event.preventDefault();
    const id = $(event.currentTarget).parent().parent().attr('tweet');

    const result2 = await axios({
        method: 'get',
        url: `https://comp426fa19.cs.unc.edu/a09/tweets/${id}`,
        withCredentials: true,
    });
    const result = await axios({
        method: 'put',
        url: `https://comp426fa19.cs.unc.edu/a09/tweets/${id}/unlike`,
        withCredentials: true,
    });

    let likes = result2.data.likeCount - 1;
    console.log(likes);
    let unlikeButton = `<button class="button" id="unlikeBtn"><i class="material-icons">favorite_border</i><span>${likes}</span></button>`;
    let cur = $(event.currentTarget)[0];
    cur.outerHTML = unlikeButton;
}

$(document).ready(function () {
    let $root = $('#root');
    //load page content
    $('body').append(renderPage());
    setHeader();

    $(document).on('scroll', function()
	{
		setHeader();
    });
    newRecipe();
})
