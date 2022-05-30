import { async } from 'regenerator-runtime';
// import helper functions
import { transformObjPropNamesToCamelCase } from './utils';
// import api url from config
import { FORKIFY_API_URL } from './config';
import { getJSON } from './helpers';

// state object
export const state = {
  recipe: {},
  search: {
    query: '',
    results: {},
  },
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
    throw err;
  }
};

// load search results
export const loadSearchResults = async function (query) {
  try {
    // get all recipes for the given query
    const data = await getJSON(`${FORKIFY_API_URL}?search=${query}`);
    // update the state
    state.search = {
      query: query,
      results: data.data.recipes.map(recipe =>
        transformObjPropNamesToCamelCase(recipe)
      ),
    };
    console.log(state.search.results);
  } catch (err) {
    throw err;
  }
};
loadSearchResults('pizza');
