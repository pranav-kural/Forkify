// import polyfills to support old browsers
import 'core-js/stable';
import 'regenerator-runtime/runtime';
// import state and functions from model
import * as model from './model';
// import views
import recipeView from './views/recipeView';

const recipeContainer = document.querySelector('.recipe');

// https://forkify-api.herokuapp.com/v2

///////////////////////////////////////

const showRecipe = async function () {
  // get recipe Id from hash (remove first '#' character)
  const recipeId = window.location.hash.slice(1);
  // if no recipe selected yet, return
  if (!recipeId) return;
  // render spinner
  recipeView.renderSpinner();
  // get recipe data and pass it on to renderRecipe function
  model
    .loadRecipe(recipeId)
    .then(() => recipeView.render(model.state.recipe))
    .catch(err => {
      console.error(err);
    });
};

const renderRecipe = recipe => {
  // clear recipe countainer
  recipeContainer.innerHTML = '';
  recipeContainer.insertAdjacentHTML('afterbegin', getRecipeHTML(recipe));
};

// add event listeners for showRecipe
['hashchange', 'load'].forEach(e => addEventListener(e, showRecipe));
