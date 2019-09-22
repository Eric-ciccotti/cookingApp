import { Ingredient } from '../shared/ingredient.model';

export class Recipe {
  public name: string;
  public description: string;
  public imagePath: string;

  constructor(name: string, desc: string, imagePath: string, public ingredients: Ingredient[]) {
    this.name = name;
    this.description = desc;
    this.imagePath = imagePath;
  }
}


// >>> sans raccourcie >>>
// public ingredient: Ingredient[];
// constructor(ingredients: Ingredient[]) {
//   this.ingredients = ingredients;
// }

// >>> raccourcie >>>
// constructor(public ingredients: Ingredient[]) {
// }




