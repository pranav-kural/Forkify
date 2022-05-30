import { getRecipeHTML } from './markups/htmlComponents';

class RecipeView {
  #parentElement = document.querySelector('.recipe');

  // render the recipe component on view
  render(recipeData) {
    // clear recipe countainer
    this.#parentElement.innerHTML = '';
    this.#parentElement.insertAdjacentHTML(
      'afterbegin',
      getRecipeHTML(recipeData)
    );
  }
}

// export a new instance of recipeView
export default new RecipeView();
