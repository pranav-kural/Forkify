// import polyfills to support old browsers
import 'core-js/stable';
import 'regenerator-runtime/runtime';
import { async } from 'regenerator-runtime/runtime';
// import state and functions from model
import * as model from './model';
// import views
import recipeView from './views/recipeView';
import searchView from './views/searchView';

///////////////////////////////////////

const controlRecipe = async function () {
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
      recipeView.renderError();
    });
};

const controlSearchResults = async function () {
  // get the search query
  const query = searchView.getQuery();
  // if invalid, return
  if (!query) return;
  try {
    await model.loadSearchResults(query);
    console.dir(model.state.search);
  } catch (err) {
    recipeView.renderError();
  }
};

controlSearchResults();

// initialize event handler
(function () {
  recipeView.addEventHandler(controlRecipe);
  searchView.addEventHandler(controlSearchResults);
})();
