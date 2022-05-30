import icons from 'url:../../../img/icons.svg';
import Fraction from 'fractional';

export function recipeHTML(recipe) {
  return `
        <figure class="recipe__fig">
          <img src="${recipe.imageUrl}" alt="Tomato" class="recipe__img" />
          <h1 class="recipe__title">
            <span>${recipe.title}</span>
          </h1>
        </figure>

        <div class="recipe__details">
          <div class="recipe__info">
            <svg class="recipe__info-icon">
              <use href="${icons}#icon-clock"></use>
            </svg>
            <span class="recipe__info-data recipe__info-data--minutes">${
              recipe.cookingTime
            }</span>
            <span class="recipe__info-text">minutes</span>
          </div>
          <div class="recipe__info">
            <svg class="recipe__info-icon">
              <use href="${icons}#icon-users"></use>
            </svg>
            <span class="recipe__info-data recipe__info-data--people">${
              recipe.servings
            }</span>
            <span class="recipe__info-text">servings</span>

            <div class="recipe__info-buttons">
              <button class="btn--tiny btn--increase-servings">
                <svg>
                  <use href="${icons}#icon-minus-circle"></use>
                </svg>
              </button>
              <button class="btn--tiny btn--increase-servings">
                <svg>
                  <use href="${icons}.svg#icon-plus-circle"></use>
                </svg>
              </button>
            </div>
          </div>

          <div class="recipe__user-generated">
            <svg>
              <use href="${icons}.svg#icon-user"></use>
            </svg>
          </div>
          <button class="btn--round">
            <svg class="">
              <use href="${icons}.svg#icon-bookmark-fill"></use>
            </svg>
          </button>
        </div>

        <div class="recipe__ingredients">
          <h2 class="heading--2">Recipe ingredients</h2>
          <ul class="recipe__ingredient-list">
            ${generateIngredientsComponent(recipe.ingredients)}
          </ul>
        </div>

        <div class="recipe__directions">
          <h2 class="heading--2">How to cook it</h2>
          <p class="recipe__directions-text">
            This recipe was carefully designed and tested by
            <span class="recipe__publisher">${
              recipe.publisher
            }</span>. Please check out
            directions at their website.
          </p>
          <a
            class="btn--small recipe__btn"
            href="${recipe.sourceUrl}"
            target="_blank"
          >
            <span>Directions</span>
            <svg class="search__icon">
              <use href="${icons}.svg#icon-arrow-right"></use>
            </svg>
          </a>
        </div>
  `;
}

function generateIngredientsComponent(recipeIngredients) {
  return recipeIngredients
    ?.map(ing => {
      return `
        <li class="recipe__ingredient">
        <svg class="recipe__icon">
          <use href="${icons}.svg#icon-check"></use>
        </svg>
        <div class="recipe__quantity">${
          ing?.quantity ? new Fraction.Fraction(ing?.quantity).toString() : ''
        }</div>
        <div class="recipe__description">
          <span class="recipe__unit">${ing?.unit}</span>
          ${ing?.description}
        </div>
      </li>
        `;
    })
    .join('');
}

export const previewHTML = data => {
  return data.map(recipe => generatePreviewComponent(recipe)).join('');
};

function generatePreviewComponent(data) {
  return `
          <li class="preview">
            <a class="preview__link preview__link--active" href="#${data?.id}">
              <figure class="preview__fig">
                <img src="${data?.imageUrl}" alt="Test" />
              </figure>
              <div class="preview__data">
                <h4 class="preview__title">${data?.title}</h4>
                <p class="preview__publisher">${data?.publisher}</p>
                <div class="preview__user-generated">
                  <svg>
                    <use href="${icons}#icon-user"></use>
                  </svg>
                </div>
              </div>
            </a>
          </li>
  `;
}

export const spinnerHTML = `
<div class="spinner">
<svg>
  <use href="${icons}#icon-loader"></use>
</svg>
</div>
`;

export const errorHTML = errorMessage => `
          <div class="error">
            <div>
              <svg>
                <use href="${icons}#icon-alert-triangle"></use>
              </svg>
            </div>
            <p>${errorMessage}</p>
          </div>
          `;

export const messageHTML = message => `
          <div class="message">
            <div>
              <svg>
                <use href="${icons}#icon-smile"></use>
              </svg>
            </div>
            <p>${message}</p>
          </div>
          `;
