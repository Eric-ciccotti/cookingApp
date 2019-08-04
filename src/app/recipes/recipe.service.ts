import { EventEmitter } from "@angular/core";
import { Recipe } from "./recipe.model";
import { Ingredient } from "../shared/ingredient.model";

export class RecipeService {

  recipeSelected = new EventEmitter<Recipe>();

  private recipes: Recipe[] = [
    new Recipe(
    'Coco chiken',
    'Very tasty chiken coco recipe',
    'https://assets.afcdn.com/recipe/20161128/60272_w600.jpg',
    [
      new Ingredient('filet de poulet',2),
      new Ingredient('lait de coco',1)
    ]),
   new Recipe(
     'Steak frites',
     'Un savoureux steak avec des frites croustilante',
     'https://upload.wikimedia.org/wikipedia/commons/thumb/6/62/Sirloin_steak_with_garlic_butter_and_french_fries_cropped.jpg/440px-Sirloin_steak_with_garlic_butter_and_french_fries_cropped.jpg',
     [
       new Ingredient('Sac de fritte de pomme de terre',1),
       new Ingredient('steak haché de la boucherie',1)
     ]
   )

  ];

  getRecipes() {
    return this.recipes.slice();
  }
}
