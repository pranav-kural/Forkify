// import polyfills to support old browsers
import 'core-js/stable';
import 'regenerator-runtime/runtime';
// import state and functions from model
import * as model from './model';
// import views
import recipeView from './views/recipeView';
// import HTML components
import { spinnerHTML } from './views/markups/htmlComponents';

const recipeContainer = document.querySelector('.recipe');

const timeout = function (s) {
  return new Promise(function (_, reject) {
    setTimeout(function () {
      reject(new Error(`Request took too long! Timeout after ${s} second`));
    }, s * 1000);
  });
};

const renderSpinner = parentEl => {
  // clear recipe countainer
  recipeContainer.innerHTML = '';
  // display spinner
  parentEl.insertAdjacentHTML('afterbegin', spinnerHTML);
};

// https://forkify-api.herokuapp.com/v2

///////////////////////////////////////

const showRecipe = async function () {
  // get recipe Id from hash (remove first '#' character)
  const recipeId = window.location.hash.slice(1);
  // if no recipe selected yet, return
  if (!recipeId) return;
  // render spinner
  renderSpinner(recipeContainer);
  try {
    // fetch single recipe
    const res = await fetch(
      `https://forkify-api.herokuapp.com/api/v2/recipes/${recipeId}`
    );
    // retrieve data from response
    const data = await res.json();
    // check if request failed
    if (!res.ok) throw new Error(`${data.message} (${res.status})`);

    // get recipe data and pass it on to renderRecipe function
    model
      .loadRecipe(recipeId)
      .then(() => recipeView.render(model.state.recipe))
      .catch(e => {
        throw new Error(e);
      });
  } catch (err) {
    console.error(err);
  }
};

const renderRecipe = recipe => {
  // clear recipe countainer
  recipeContainer.innerHTML = '';
  recipeContainer.insertAdjacentHTML('afterbegin', getRecipeHTML(recipe));
};

// add event listeners for showRecipe
['hashchange', 'load'].forEach(e => addEventListener(e, showRecipe));
