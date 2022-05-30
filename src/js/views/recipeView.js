import ParentView from './parentView';
import { recipeHTML } from './markups/htmlComponents';

class RecipeView extends ParentView {
  constructor() {
    // set parent element
    super(document.querySelector('.recipe'), recipeHTML);
  }

  addEventHandler(handler) {
    // add event listeners for updating recipe on view
    ['hashchange', 'load'].forEach(e => addEventListener(e, handler));
  }
}

// export a new instance of recipeView
export default new RecipeView();
