import { getRecipeHTML, spinnerHTML } from './markups/htmlComponents';

class RecipeView {
  #parentElement = document.querySelector('.recipe');

  // render the recipe component on view
  render(recipeData) {
    this.#clear();
    this.#parentElement.insertAdjacentHTML(
      'afterbegin',
      getRecipeHTML(recipeData)
    );
  }

  // clear the parent element
  #clear() {
    // clear recipe countainer
    this.#parentElement.innerHTML = '';
  }

  renderSpinner() {
    this.#clear();
    // display spinner
    this.#parentElement.insertAdjacentHTML('afterbegin', spinnerHTML);
  }
}

// export a new instance of recipeView
export default new RecipeView();
