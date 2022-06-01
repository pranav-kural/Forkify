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
  bookmarks: [],
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

    state.recipe.bookmarked = state.bookmarks.some(
      bookmarkedRecipe => bookmarkedRecipe.id === recipeId
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
    state.search.currentPage = 1;
  } catch (err) {
    throw err;
  }
};

export const getSearchResultsPage = (page = state.search.currentPage) => {
  // if no results present, return
  if (!state.search.results || state.search.results === {}) return;
  // update state to represent current page
  state.search.currentPage = page;
  const start = (page - 1) * state.search.resultsPerPage;
  const end = page * state.search.resultsPerPage;
  if (state.search.results.slice) return state.search.results.slice(start, end); // return page results
};

export const updateServings = newServings => {
  state.recipe.ingredients.forEach(ing => {
    ing.quantity = (ing.quantity * newServings) / state.recipe.servings;
  });

  state.recipe.servings = newServings;
};

const persistBookmarks = () =>
  localStorage.setItem('bookmarks', JSON.stringify(state.bookmarks));

export const addBookmark = recipe => {
  // add recipe to the bookmarks
  state.bookmarks.push(recipe);
  // mark current recipe as bookmark
  if (recipe.id === state.recipe.id) state.recipe.bookmarked = true;
  // update bookmarks in persistent storage
  persistBookmarks();
};

export const deleteBookmark = recipe => {
  const index = state.bookmarks.findIndex(el => el.id === recipe.id);
  state.bookmarks.splice(index, 1);

  // remove the bookmark
  if (recipe.id === state.recipe.id) state.recipe.bookmarked = false;
  // update bookmarks in persistent storage
  persistBookmarks();
};

const init = () => {
  // get stored bookmarks
  const storedBookmarks = localStorage.getItem('bookmarks');
  // update the state with stored bookmarks if available
  if (storedBookmarks) state.bookmarks = JSON.parse(storedBookmarks);
};
init();
