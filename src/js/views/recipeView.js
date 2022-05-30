import {
  errorHTML,
  getRecipeHTML,
  messageHTML,
  spinnerHTML,
} from './markups/htmlComponents';

class RecipeView {
  #parentElement = document.querySelector('.recipe');
  #defaultMessage = '';
  #defaultErrorMessage =
    "We could not find the recipe you're looking for. Please try another one!";

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

  renderError(errorMessage = this.#defaultErrorMessage) {
    this.#clear();
    this.#parentElement.insertAdjacentHTML(
      'afterbegin',
      errorHTML(errorMessage)
    );
  }

  renderMessage(message = this.#defaultMessage) {
    this.#clear();
    this.#parentElement.insertAdjacentHTML('afterbegin', messageHTML(message));
  }

  addEventHandler(handler) {
    // add event listeners for updating recipe on view
    ['hashchange', 'load'].forEach(e => addEventListener(e, handler));
  }
}

// export a new instance of recipeView
export default new RecipeView();
