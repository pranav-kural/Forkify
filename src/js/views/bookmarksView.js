import ParentView from './parentView';
import { previewHTML } from './markups/htmlComponents';

class BookmarksView extends ParentView {
  constructor() {
    // set parent element
    super(document.querySelector('.bookmarks__list'), previewHTML);
    this._defaultErrorMessage =
      'No bookmarks yet. Find a nice recipe and bookmark it :)';
  }

  bookmarksRenderHandler(handler) {
    window.addEventListener('load', handler);
  }
}

export default new BookmarksView();
