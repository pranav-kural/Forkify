import ParentView from './parentView';
import { paginationHTML } from './markups/htmlComponents';

class PaginationView extends ParentView {
  constructor() {
    // set parent element
    super(document.querySelector('.pagination'));
    // set markup generator
    this._markupGenerator = this._generatePagination;
  }

  _generatePagination(data) {
    // calculate number of pages
    const numPages = Math.ceil(data.results.length / data.resultsPerPage);
    let next = '';
    let prev = '';
    // get current page user is on from model state data provided
    const currentPage = Number.parseInt(data.currentPage);

    // if on Page 1, and there are other pages
    if (currentPage === 1 && numPages > 1) next = currentPage + 1;
    // if on last page
    else if (currentPage === numPages && numPages > 1) prev = numPages - 1;
    // if in between pages, and there are other pages
    else if (currentPage < numPages) {
      prev = currentPage - 1;
      next = currentPage + 1;
    }

    // return HTML markup result based on value of prev and next
    return paginationHTML(prev, next);
  }

  addEventHandler(handler) {
    this._parentElement.addEventListener('click', e => {
      const btn = e.target.closest('.btn--inline');
      if (!btn) return;
      // execute the handler
      handler(btn.dataset.goto);
    });
  }
}

export default new PaginationView();
