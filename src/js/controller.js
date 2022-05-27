import { transformObjPropNamesToCamelCase } from './utils';
import { getRecipeHTML } from './views/recipe';

const recipeContainer = document.querySelector('.recipe');

const timeout = function (s) {
  return new Promise(function (_, reject) {
    setTimeout(function () {
      reject(new Error(`Request took too long! Timeout after ${s} second`));
    }, s * 1000);
  });
};

// https://forkify-api.herokuapp.com/v2

///////////////////////////////////////

const showRecipe = async function () {
  try {
    // ftech single recipe
    const res = await fetch(
      'https://forkify-api.herokuapp.com/api/v2/recipes/5ed6604591c37cdc054bc886'
    );
    // retrieve data from response
    const data = await res.json();
    // check if request failed
    if (!res.ok) throw new Error(`${data.message} (${res.status})`);

    // get recipe data and pass it on to renderRecipe function
    // transform property names in original recipe data object to camelCase
    renderRecipe(transformObjPropNamesToCamelCase(data.data.recipe));
  } catch (err) {
    console.error(err);
  }
};
showRecipe();

const renderRecipe = recipe => {
  // hide message
  recipeContainer.innerHTML = '';
  recipeContainer.insertAdjacentHTML('afterbegin', getRecipeHTML(recipe));
};
