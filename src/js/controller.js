import { transformObjPropNamesToCamelCase } from './utils';

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

    let recipe = transformObjPropNamesToCamelCase(data.data.recipe);

    console.log('recipe', recipe);
  } catch (err) {
    console.error(err);
  }
};
showRecipe();
