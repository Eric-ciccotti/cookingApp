import { EventEmitter, Injectable } from "@angular/core";

import { Recipe } from "./recipe.model";
import { Ingredient } from "../shared/ingredient.model";

import { ShoppingListService } from "../shopping-list/shopping-list.service";
import { Subject, BehaviorSubject } from "rxjs";

@Injectable()
export class RecipeService {
  recipeChanged = new Subject<Recipe[]>();

  private dummyRecipe: Recipe[] = [
    new Recipe(
      "Cheese burger",
      "This recipe for the BEST Cheeseburger ever is so freaking delicious",
      "https://upload.wikimedia.org/wikipedia/commons/4/4d/Cheeseburger.jpg",
      [
        new Ingredient("fresh chopped steak", 2),
        new Ingredient("salad leaf", 2),
        new Ingredient("tomatoes", 1),
        new Ingredient("onions slices", 4),
        new Ingredient("onions slices", 4)
      ]
    ),
    new Recipe(
      "Apple pie",
      "A slice of this homemade apple pie will make you feel happy!",
     "https://www.sccpre.cat/mypng/detail/211-2111827_pastry-drawing-lattice-pie-apple-pie.png",
      [
        new Ingredient("Green pie", 2),
        new Ingredient("Sugar tablespoon", 4),
        new Ingredient("tablespoons all-purpose flour", 10),
        new Ingredient("large egg white", 1),
      ]
    )
  ];

  private recipes: Recipe[] = [];

  constructor(private shoppingListService: ShoppingListService) {}

  getRecipes() {
    return this.recipes.slice();
  }

  getDummyRecipes() {
    return this.dummyRecipe.slice();
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
