import { Ingredient } from '../shared/ingredient.model';
import { EventEmitter, Injectable } from '@angular/core';


export class ShoppingListService {
  ingredientsChanged = new EventEmitter<Ingredient[]>();
  // on crée une instance d'eventEmitter qui sera un tableau basé le model d'ingrédient

  private ingredients: Ingredient[] = [
    new Ingredient('Apple', 5),
    new Ingredient('Tomatoes', 2)
  ];

  getIngredients() {
    return this.ingredients.slice();
  }

  onAddIngredient(ingredient: Ingredient) {
    this.ingredients.push(ingredient);
    this.ingredientsChanged.emit(this.ingredients.slice());
    // on emet une copie du tableau ingredient avec le changement
  }

  addIngredients(ingredients: Ingredient[]) {
    // for (let ingredient of ingredients) {
    //   this.onAddIngredient(ingredient)
    // }
    this.ingredients.push(...ingredients);
    this.ingredientsChanged.emit(this.ingredients.slice())
    // le spread operator transforme un > tableau < en une  > liste séparée par des virgules <,



  }

}
