# COMP426_Final_Project

Due to the spoonacular API not responding to requests despite many different attempts, we switched our API to Google Account Logins. Our website takes in Google Accounts without requiring a separate signup. However in order for the API to work properly the local hosting of the website (running it on your own computer) requires the url to be "http://localhost". If the URL is not that Google sign in will not work properly.

Our homepage is located in /homepage/homepage.html. In that homepage, it is possible to access every part of our website depending on login / public status. You must run the backend on a separate directory in order for the website to function as normal. 

Everyone loves food, foodies rejoice! 
Food Build is used to create, share, and browse recipes created by other users. With functionalities such as liking and unliking different recipes and posting comments to give feedback, we seek to create an interactive community bound together by our singular love for food. 

On the homepage, there are at most three featured recipes displayed. These recipes are chosen based off of their high "like" values. Check them out with our search function! By clicking on "find recipe" you will be redirected to a search by ingredients page. You can scroll down to see the available list of recipes. If you want to look up a recipe based off of ingredients, feel free to type them in! Our search bar has autofill and gradually suggests more specific available ingredients as you type. Click submit to see the recipes that you might be interested in! 

By clicking on the recipe box, you can see more details. If you are logged in you can see comments and have the ability to like / unlike recipes! If you are not logged in.. sorry! You cannot see any comments and don't have the option to rate our recipes. But don't worry, you can join our community easily! 

If you haven't tried it yet, if you click on "my page" or "create recipe" you are redirected to a login page if you are not logged in. If you are logged in, feel free to use those pages! However, we will talk about those pages later. We want you logged in first! You can either log in with an existing account or press the register button to sign up for a new account. Don't try to take other people's usernames though! We don't allow that. If you are looking for an easy way to join us, feel free to login with google! It's quick and easy, just press the button. 

Once you login you're automatically redirected to your page! You also probably noticed that you have a logout button on the top of the website now. It's self explanatory what that does and it even signs you out of google if you click it. Enough about that, let's talk about your page. Your page has a collection of your personal recipes and your favorites. We save the recipes that you like so that you can look at them later. You also have other saved recipes that you might want to look at them in the distant future. You can check your recipes anytime with this page too, see how many likes you got! 

Now on to the bread and butter of this website: creating recipes. 
Click on "create recipe" and scroll down to see the field. You must input your recipe name, description, ingredients, and instructions. An image is necessary, but if you don't have any don't worry! We have a default image to use for that. Feel free to be as descriptive and detailed as you want! We give you lots of freedom, but only one big rule: separate your ingredients with comma, like this. Submit your recipes whenever you're done and maybe you'll see them on the front page! 




                                                        ---- Proposal ----
We would like to create an app to search for user created recipes that will display the recipes’ nutritional value. Users will be able to share recipes with others and see the details for those recipes. For the HTML input field it will have two search functions: one it will be able to look up recipes and the other will auto fill ingredients when you create a recipe. Users will be able to create their own account and store their own recipes that they upload as well as the recipes that they liked from other users. All of this data will be stored in the backend. The public should be able to view the recipes but will have limited functionalities including the capability to store another user’s recipe or the ability to edit the recipe to store as their own. In addition, by creating an account, users will have access to the private resource including the ability to liking another’s recipe. The number of likes will be saved and updated dynamically for reasons mentioned later. For users, they can edit and delete their own recipes. In addition, as mentioned before, users will be able to save others recipes and edit them in their own way and save the recipes as their own. To be able to determine which recipe was created first, we will make sure to capture the date created for the recipe and add it to the user interface just in case. With the number of likes that a recipe gets, the homepage will be updated to display the most liked recipes to recommend to the viewers. This way, the website will get changed as the number of likes per recipe changes from time to time. Finally, our group is planning to use the API from spoonacular to access the ingredients, nutrition, allergens, and more for the user created recipes. 

•	create HTML capabilities to allow users to create their accounts and look up recipes, ingredients, etc. through JavaScript
•	users will be able to add their own recipes which will change the database (backend)
•	make homepage dynamic using JavaScript to update the most liked recipes
•	use bulma CSS for style
•	implement spoonacular API for information regarding nutritions and more


