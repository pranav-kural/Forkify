// import polyfills to support old browsers
import 'core-js/stable';
import 'regenerator-runtime/runtime';
import { async } from 'regenerator-runtime/runtime';
// import state and functions from model
import * as model from './model';
// import views
import recipeView from './views/recipeView';
import searchView from './views/searchView';
import resultsView from './views/resultsView';

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
  resultsView.renderSpinner();
  // get the search query
  const query = searchView.getQuery();
  // if invalid, return
  if (!query) return;
  try {
    await model.loadSearchResults(query);
    resultsView.render(model.state.search.results);
  } catch (err) {
    recipeView.renderError();
  }
};

// initialize event handler
(function () {
  recipeView.addEventHandler(controlRecipe);
  searchView.addEventHandler(controlSearchResults);
})();
