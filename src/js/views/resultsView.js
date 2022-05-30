import ParentView from './parentView';
import { previewHTML } from './markups/htmlComponents';

class ResultsView extends ParentView {
  _query;

  constructor() {
    // set parent element
    super(document.querySelector('.results'), previewHTML);
    this._defaultErrorMessage =
      'No recipes found for your query! Please try again! :(';
  }

  setQuery(queryValue) {
    this._query = queryValue;
    this._defaultErrorMessage = `No recipes found for ${
      this._query ? "'" + this._query + "'." : 'your query!'
    } Please try again! :(`;
  }
}

export default new ResultsView();
