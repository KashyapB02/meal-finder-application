"use strict";
import { __fetchMealEndpoint__, __fetchRecipeEndpoint__ } from "./Api.js";
import {
  initialMealsBanner,
  noMealsContentHTML,
  getMealCardContentHTML,
  getRecipeContentHTML,
} from "./ContentMarkups.js";
import { fetchingMealsLoaderHTML, fetchingRecipeLoaderHTML } from "./LoaderMarkups.js";

const searchForm = document.querySelector("[data-id='searchForm']");
const searchInput = document.querySelector("[data-id='searchInput']");
const mealDisplayGrid = document.querySelector("[data-id='mealDisplayGrid']");
const recipeModalOverlay = document.querySelector("[data-id='recipeModalOverlay']");

searchForm.addEventListener("submit", async (event) => {
  event.preventDefault();
  if (!searchInput.value) {
    mealDisplayGrid.innerHTML = initialMealsBanner;
    return;
  }

  const mealList = await getMealList();
  populateMeals(mealList);
});

const getMealList = async () => {
  mealDisplayGrid.innerHTML = fetchingMealsLoaderHTML;
  const ingredient = getFormattedIngredient(searchInput.value);

  try {
    const response = await fetch(`${__fetchMealEndpoint__}${ingredient}`);
    if (!response.ok) throw new Error(JSON.stringify(response));

    const data = await response.json();
    return data.meals;
  } catch (errString) {
    const err = JSON.parse(errString);
    console.error("Error in fetching meal list: ", err);
  }
};

const getMealRecipe = async (_id) => {
  recipeModalOverlay.innerHTML = fetchingRecipeLoaderHTML;
  recipeModalOverlay.classList.remove("hidden");

  try {
    const response = await fetch(`${__fetchRecipeEndpoint__}${_id}`);
    if (!response.ok) throw new Error(JSON.stringify(response));

    const data = await response.json();
    return data.meals[0];
  } catch (errString) {
    const err = JSON.parse(errString);
    console.error("Error in fetching meal recipe: ", err);
  }
};

const populateMeals = (_mealList) => {
  if (!_mealList) {
    mealDisplayGrid.innerHTML = noMealsContentHTML;
    return;
  }

  mealDisplayGrid.innerHTML = "";

  _mealList.forEach((meal) => {
    mealDisplayGrid.insertAdjacentHTML(
      "beforeEnd",
      getMealCardContentHTML(meal.idMeal, meal.strMealThumb, meal.strMeal)
    );
  });

  setFetchRecipeAction();
};

const populateMealRecipe = (_recipe) => {
  if (!_recipe) return;

  recipeModalOverlay.innerHTML = getRecipeContentHTML(_recipe);
  setModalCloseAction();
};

const getFormattedIngredient = (_ingredient) => {
  const trimmedIngredient = _ingredient.trim();
  const lowecasedIngredient = trimmedIngredient.toLowerCase();

  return lowecasedIngredient.split(" ").join("_");
};

const setFetchRecipeAction = () => {
  const getRecipeBtns = document.querySelectorAll(
    ".app__searchResultSection__mealDisplayGrid__mealCard__recipeBtn"
  );

  for (let btns of getRecipeBtns) {
    const id = btns.dataset.id;
    btns.addEventListener("click", async () => {
      const recipe = await getMealRecipe(id);
      populateMealRecipe(recipe);
    });
  }
};

const setModalCloseAction = () => {
  const modalCloseBtn = document.querySelector("[data-id='modalCloseBtn']");
  modalCloseBtn.addEventListener("click", () => {
    recipeModalOverlay.innerHTML = "";
    recipeModalOverlay.classList.add("hidden");
  });
};
