class SearchView {
  #parentElement = document.querySelector('.search');

  getQuery() {
    return this.#parentElement.querySelector('.search__field').value;
  }

  clearInput() {
    this.#parentElement.querySelector('.search__field').value = '';
  }

  addEventHandler(handler) {
    this.#parentElement.addEventListener('submit', e => {
      e.preventDefault();
      handler();
      this.clearInput();
    });
  }
}

// export an instance
export default new SearchView();
