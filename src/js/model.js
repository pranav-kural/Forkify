import { async } from 'regenerator-runtime';
// import helper functions
import { transformObjPropNamesToCamelCase } from './utils';
// import api url from config
import { FORKIFY_API_URL } from './config';
import { getJSON } from './helpers';

// state object
export const state = {
  recipe: {},
};

// fetch recipe data
export const loadRecipe = async function (recipeId) {
  try {
    // get recipe data using getJSON helper function and update state to store recipe data
    // transform property names in original recipe data object to camelCase
    state.recipe = transformObjPropNamesToCamelCase(
      await getJSON(`${FORKIFY_API_URL}${recipeId}`).then(
        responseData => responseData.data.recipe
      )
    );
  } catch (err) {
    console.error(err);
  }
};
