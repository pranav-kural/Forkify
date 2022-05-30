import { async } from 'regenerator-runtime';
// import helper functions
import { transformObjPropNamesToCamelCase } from './utils';

// state object
export const state = {
  recipe: {},
};

// fetch recipe data
export const loadRecipe = async function (recipeId) {
  try {
    // fetch single recipe
    const res = await fetch(
      `https://forkify-api.herokuapp.com/api/v2/recipes/${recipeId}`
    );
    // retrieve data from response
    const data = await res.json();
    // check if request failed
    if (!res.ok) throw new Error(`${data.message} (${res.status})`);
    // update state and store the recipe data
    // transform property names in original recipe data object to camelCase
    state.recipe = transformObjPropNamesToCamelCase(data.data.recipe);
  } catch (err) {
    throw new Error(err);
  }
};
