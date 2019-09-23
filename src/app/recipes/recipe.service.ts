import { EventEmitter, Injectable } from "@angular/core";

import { Recipe } from "./recipe.model";
import { Ingredient } from "../shared/ingredient.model";

import { ShoppingListService } from "../shopping-list/shopping-list.service";
import { Subject } from 'rxjs';


@Injectable()
export class RecipeService {
  recipeChanged = new Subject<Recipe[]>();

  private dummyRecipe: Recipe[] = [
    new Recipe(
      "Coco chiken",
      "Very tasty chiken coco recipe",
      "https://assets.afcdn.com/recipe/20161128/60272_w600.jpg",
      [new Ingredient("filet de poulet", 2), new Ingredient("lait de coco", 1)]
    ),
    new Recipe(
      "Steak frites",
      "Un savoureux steak avec des frites croustilante",
      "https://upload.wikimedia.org/wikipedia/commons/thumb/6/62/Sirloin_steak_with_garlic_butter_and_french_fries_cropped.jpg/440px-Sirloin_steak_with_garlic_butter_and_french_fries_cropped.jpg",
      [
        new Ingredient("Frittes de pomme de terre", 1),
        new Ingredient("steak haché", 1)
      ]
    )
  ];

  private recipes: Recipe[] = [];

  constructor(private shoppingListService: ShoppingListService) {}

  getRecipes() {
    return this.recipes.slice();
  }

  getDummyRecipes() {
    return this.dummyRecipe.slice()
  }

  getRecipeById(index: number) {
    return this.recipes[index];
  }

  addIngredientToShoppingList(ingredient: Ingredient[]) {
    this.shoppingListService.addIngredients(ingredient);
  }

  addRecipe(recipe: Recipe) {
    this.recipes.push(recipe);
    return this.recipeChanged.next(this.recipes.slice());
  }

  updateRecipe(index: number, newRecipe: Recipe) {
    this.recipes[index] = newRecipe;
    return this.recipeChanged.next(this.recipes.slice());
  }

  deleteRecipe(index: number) {
    this.recipes.splice(index, 1);
    return this.recipeChanged.next(this.recipes.slice());
  }

  setRecipe(recipes: Recipe[]) {
    this.recipes = recipes;
    return this.recipeChanged.next(this.recipes.slice());
    // il est important de next la nouvelle recette à chaque fois, afin que a tous les endroits
    // ou on a soucris au subject recipeChanged, il y ai récupèration de la recette
  }
}
