import ParentView from './parentView';
import { recipeHTML } from './markups/htmlComponents';

class RecipeView extends ParentView {
  constructor() {
    // set parent element
    super(document.querySelector('.recipe'), recipeHTML);
    this._defaultErrorMessage =
      "We could not find the recipe you're looking for. Please try another one!";
  }

  addEventHandler(handler) {
    // add event listeners for updating recipe on view
    ['hashchange', 'load'].forEach(e => addEventListener(e, handler));
  }
}

// export a new instance of recipeView
export default new RecipeView();
