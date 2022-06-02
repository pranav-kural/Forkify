import ParentView from './parentView';
import { previewHTML } from './markups/htmlComponents';
import { ADD_RECIPE_MODAL_CLOSE_TIMEOUT_SECONDS } from '../config';

class AddRecipeView extends ParentView {
  constructor() {
    // set parent element
    super(document.querySelector('.upload'), previewHTML);
    this._defaultErrorMessage =
      'Unable to add recipe :( Please try again later!';
    this._defaultMessage = 'Recipe was successfully uploaded :)';
    // select the DOM elements needed
    this._window = document.querySelector('.add-recipe-window');
    this._overlay = document.querySelector('.overlay');
    this._btnOpen = document.querySelector('.nav__btn--add-recipe');
    this._btnClose = document.querySelector('.btn--close-modal');
    // attach click event listener to add recipe button
    [this._btnOpen, this._btnClose, this._overlay].forEach(
      this.addEventHandler.bind(this)
    );
  }

  addEventHandler(el) {
    if (!el) return;
    el.addEventListener('click', this.showHideAddRecipeForm.bind(this));
  }

  showHideAddRecipeForm() {
    this._overlay.classList.toggle('hidden');
    this._window.classList.toggle('hidden');
  }

  submitFormHandler(handler) {
    this._parentElement.addEventListener('submit', function (e) {
      e.preventDefault();
      const dataArray = [...new FormData(this)];
      handler(Object.fromEntries(dataArray));
    });
  }

  hideCloseButtonTemp() {
    this._btnClose.classList.add('hidden');
    setTimeout(() => {
      this._btnClose.classList.remove('hidden');
    }, ADD_RECIPE_MODAL_CLOSE_TIMEOUT_SECONDS * 1000);
  }
}

export default new AddRecipeView();
