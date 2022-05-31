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

  update(data) {
    if (!data || (Array.isArray(data) && data.length === 0) || data === {})
      return this.renderError();
    // store new markup
    const newMarkup = this._markupGenerator(data);
    // create virtual DOM elements
    const newDOM = document.createRange().createContextualFragment(newMarkup);
    // get new Elements
    const newElements = Array.from(newDOM.querySelectorAll('*'));
    // get current DOM elements
    const currentElements = Array.from(
      this._parentElement.querySelectorAll('*')
    );

    newElements.forEach((newEl, i) => {
      const currentEl = currentElements[i];

      // update text content of elements that have changed
      if (
        !newEl.isEqualNode(currentEl) &&
        newEl.firstChild?.nodeValue.trim() !== ''
      ) {
        // replace just the text
        currentEl.textContent = newEl.textContent;
      }

      if (!newEl.isEqualNode(currentEl)) {
        Array.from(newEl.attributes).forEach(attr =>
          currentEl.setAttribute(attr.name, attr.value)
        );
      }
    });
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
