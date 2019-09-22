import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

import { Recipe } from './recipe.model';
import { DataStorageService } from '../shared/data-storage.service';
import { RecipeService } from './recipe.service';

//Un RESOLVER est essentiellement un code qui s'exécute avant le chargement
//d'une route pour s'assurer que certaines données dont la route dépends sois là

@Injectable({
  providedIn: 'root'
})

export class RecipesResolverService implements Resolve<Recipe[]> {
//resolve et du type generique nous devons donc définir quel type de données il va résoudre à la fin ( ici un array de recette )

  constructor(private dataStorageService: DataStorageService, private recipeService: RecipeService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const recipes = this.recipeService.getRecipes();

    if (recipes.length === 0) {
      return this.dataStorageService.fetchRecipes()
    } else {
      return recipes;
    }
    //si il n'y a pas de recette on les récupère sur le serveur
    //si il y en a déja , on ne fait rien
    //ça permet d'éviter de fetch a chaque fois des recette pour rien ( si on enregitre des ingrédients par exemple )
  }
  // pas besoin de subscribe ici parceque le resolver souscrira pour moi automatiquement si il trouve des  ( normalement on fait fetchRecipes.subscribe )
}
