import { Ingredient } from '../shared/ingredient.model';

export class Recipe {
  public id: number;
  public name: string;
  public description: string;
  public imagePath: string;

  constructor(id: number, name: string, desc: string, imagePath: string, public ingredients: Ingredient[]) {
    this.id = id;
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




