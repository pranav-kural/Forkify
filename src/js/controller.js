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
import paginationView from './views/paginationView';

// hot reloading for parcel
// if (module.hot) {
//   module.hot.accept();
// }

const controlRecipe = async function () {
  // get recipe Id from hash (remove first '#' character)
  const recipeId = window.location.hash.slice(1);
  // if no recipe selected yet, return
  if (!recipeId) return;
  // render spinner
  recipeView.renderSpinner();
  // Update results view to mark selected search result
  resultsView.update(model.getSearchResultsPage());
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
  // render spinner component
  resultsView.renderSpinner();

  // rendering results
  try {
    // load search results based on query
    await model.loadSearchResults(query);
    // update query value in results view for a descriptive error message if needed
    resultsView.setQuery(model.state.search.query);
    // show results on pagination
    renderResultsAndPagination();
  } catch (err) {
    resultsView.renderError(); // render the error
  }
};

const renderResultsAndPagination = pageNum => {
  // rendering results
  try {
    // render the results (page)
    resultsView.render(model.getSearchResultsPage(pageNum));
    // render pagination
    paginationView.render(model.state.search);
  } catch (err) {
    resultsView.renderError(); // render the error
    resultsView.setQuery(''); // reset query value of resultsView
  }
};

const controlPagination = pageNum => {
  if (!pageNum) return;
  // show results on resultsView
  renderResultsAndPagination(pageNum);
};

const controlServings = newServings => {
  // Update recipe servings (in state)
  model.updateServings(newServings);
  // Update the recipe view
  // recipeView.render(model.state.recipe);
  recipeView.update(model.state.recipe);
};

const controlBookmarks = () => {
  if (!model.state.recipe.bookmarked || model.state.recipe.bookmarked === false)
    model.addBookmark(model.state.recipe);
  else model.deleteBookmark(model.state.recipe);
  recipeView.update(model.state.recipe);
};

// initialize event handler
(function () {
  recipeView.addEventHandler(controlRecipe);
  searchView.addEventHandler(controlSearchResults);
  paginationView.addEventHandler(controlPagination);
  recipeView.handleServingsUpdate(controlServings);
  recipeView.addBookmarksHandler(controlBookmarks);
})();
