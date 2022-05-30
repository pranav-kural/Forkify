import { errorHTML, messageHTML, spinnerHTML } from './markups/htmlComponents';

export default class ParentView {
  _parentElement;
  _defaultMessage;
  _defaultErrorMessage;
  _markupGenerator;

  constructor(parentElement, markupGenerator) {
    this._parentElement = parentElement;
    this._markupGenerator = markupGenerator;
    this._defaultMessage = '';
    this._defaultErrorMessage = 'Oops, an error has occured!';
  }

  // render the component on view
  render(data) {
    if (!data || (Array.isArray(data) && data.length === 0) || data === {})
      return this.renderError();

    this._clearParentEl();
    this._parentElement.insertAdjacentHTML(
      'afterbegin',
      this._markupGenerator(data)
    );
  }

  // clear the parent element
  _clearParentEl() {
    // clear recipe countainer
    this._parentElement.innerHTML = '';
  }

  renderSpinner() {
    this._clearParentEl();
    // display spinner
    this._parentElement.insertAdjacentHTML('afterbegin', spinnerHTML);
  }

  renderError(errorMessage = this._defaultErrorMessage) {
    this._clearParentEl();
    this._parentElement.insertAdjacentHTML(
      'afterbegin',
      errorHTML(errorMessage)
    );
  }

  renderMessage(message = this._defaultMessage) {
    this._clearParentEl();
    this._parentElement.insertAdjacentHTML('afterbegin', messageHTML(message));
  }
}
