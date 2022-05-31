import { async } from 'regenerator-runtime';
// import helper functions
import { transformObjPropNamesToCamelCase } from './utils';
// import api url from config
import { FORKIFY_API_URL, SEARCH_RESULTS_PER_PAGE } from './config';
import { getJSON } from './helpers';

// state object
export const state = {
  recipe: {},
  search: {
    query: '',
    results: {},
    currentPage: 1,
    resultsPerPage: SEARCH_RESULTS_PER_PAGE,
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
    state.search.query = query;
    state.search.results = data.data.recipes.map(recipe =>
      transformObjPropNamesToCamelCase(recipe)
    );
  } catch (err) {
    throw err;
  }
};

export const getSearchResultsPage = (page = state.search.currentPage) => {
  // if no results present, return
  if (state.search.results === {}) return;
  // update state to represent current page
  state.search.currentPage = page;
  const start = (page - 1) * state.search.resultsPerPage;
  const end = page * state.search.resultsPerPage;
  return state.search.results.slice(start, end); // return page results
};

export const updateServings = newServings => {
  state.recipe.ingredients.forEach(ing => {
    ing.quantity = (ing.quantity * newServings) / state.recipe.servings;
  });

  state.recipe.servings = newServings;
};
