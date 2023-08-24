export const initialMealsBanner = `
    <div class="app__searchResultSection__mealDisplayGrid__initialBanner">
        <span class="app__searchResultSection__mealDisplayGrid__initialBanner__bannerImg">
            <img src="/public/Meal.png" alt="meal" />
        </span>
        <span class="app__searchResultSection__mealDisplayGrid__initialBanner__mainMsg">Search Meals for Your Ingredient...</span>
    </div>
`;

export const noMealsContentHTML = `
    <div class="app__searchResultSection__mealDisplayGrid__noResultContainer">
        <span class="app__searchResultSection__mealDisplayGrid__noResultContainer__noResultImg">
            <img src="/public/NoResults.png" alt="not-found" />
        </span>
        <span class="app__searchResultSection__mealDisplayGrid__noResultContainer__mainMsg">Sorry! No Result Found : (</span>
        <span class="app__searchResultSection__mealDisplayGrid__noResultContainer__subMsg">
            We didn't found what you were looking for! Please
            try some other ingredient.
        </span>
    </div>
`;

export const getMealCardContentHTML = (mealId, mealThumbnail, mealName) => {
  const html = `
        <div class="app__searchResultSection__mealDisplayGrid__mealCard">
            <span class="app__searchResultSection__mealDisplayGrid__mealCard__mealImg">
                <img src="${mealThumbnail}" alt="${mealName}" />
            </span>
            <span class="app__searchResultSection__mealDisplayGrid__mealCard__mealName">${mealName}</span>
            <button data-id="${mealId}" class="app__searchResultSection__mealDisplayGrid__mealCard__recipeBtn">
                Get Recipe
            </button>
        </div>
    `;

  return html;
};

export const getRecipeContentHTML = (__recipe) => {
  const html = `
        <div class="app__recipeModalOverlay__recipeDetailsContainer">
            <button data-id="modalCloseBtn" class="app__recipeModalOverlay__recipeDetailsContainer__modalCloseBtn">
                <i class="fa-sharp fa-solid fa-circle-xmark"></i>
            </button>
            <div class="app__recipeModalOverlay__recipeDetailsContainer__recipeHeadings">
                <span class="app__recipeModalOverlay__recipeDetailsContainer__recipeHeadings__mealTitle">${
                  __recipe.strMeal
                }</span>
                <span class="app__recipeModalOverlay__recipeDetailsContainer__recipeHeadings__mealCategory">#${
                  __recipe.strCategory
                }</span>
            </div>
            <div class="app__recipeModalOverlay__recipeDetailsContainer__mealInstructionDetails">
                <span class="app__recipeModalOverlay__recipeDetailsContainer__mealInstructionDetails__instructionTitle">Instructions</span>
                <p class="app__recipeModalOverlay__recipeDetailsContainer__mealInstructionDetails__instruction">
                    ${__recipe.strInstructions}
                </p>
            </div>
            <div class="app__recipeModalOverlay__recipeDetailsContainer__recipeFooter">
                <span class="app__recipeModalOverlay__recipeDetailsContainer__recipeFooter__recipeImg">
                    <img src="${__recipe.strMealThumb}" alt="${__recipe.strMeal}" />
                </span>
                ${
                  __recipe.strYoutube
                    ? `<a
                            href="${__recipe.strYoutube}"
                            target="_blank"
                            rel="noopener noreferrer"
                            class="app__recipeModalOverlay__recipeDetailsContainer__recipeFooter__recipeVideo"
                        >
                            <i class="fa-brands fa-youtube"></i>
                        </a>`
                    : ""
                }
            </div>
        </div>
    `;

  return html;
};
