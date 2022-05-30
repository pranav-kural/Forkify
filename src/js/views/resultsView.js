import ParentView from './parentView';
import { previewHTML } from './markups/htmlComponents';

class ResultsView extends ParentView {
  constructor() {
    // set parent element
    super(document.querySelector('.results'), previewHTML);
  }
}

export default new ResultsView();
