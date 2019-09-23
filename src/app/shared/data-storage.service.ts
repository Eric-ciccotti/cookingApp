import { Injectable } from "@angular/core";
import { HttpClient, HttpParams } from "@angular/common/http";
import { RecipeService } from "../recipes/recipe.service";
import { Recipe } from "../recipes/recipe.model";
import { map, tap, take, exhaustMap } from "rxjs/operators";
import { AuthService } from "../auth/auth.service";
import { log } from 'util';

@Injectable({
  providedIn: "root"
})
export class DataStorageService {
  constructor(
    private http: HttpClient,
    private recipeService: RecipeService,
    private authService: AuthService
  ) {}

  storeRecipes() {
    const recipe = this.recipeService.getRecipes();
    this.http
      .put("https://ng-cooking-app-5dc2a.firebaseio.com/recipe.json", recipe)
      .subscribe(response => {
        console.log(response);
      });
  }

  fetchRecipes() {
        return this.http.get<Recipe[]>(
          "https://ng-cooking-app-5dc2a.firebaseio.com/recipe.json"
        ).pipe(
      map(recipes => {
        if (recipes === null) {
          console.log('pas de recette')
          return this.recipeService.getDummyRecipes();
          // on récupère des recettes de base si jamais on supprime/sauvegarde , un array de recette vide
        }
        console.log('log de recipe au fetch:', recipes);

        return recipes.map(recipe => {
          return {
            ...recipe,
            ingredients: recipe.ingredients ? recipe.ingredients : []
          }; // dans le cas ou il y a 0 ingredients on envoi un objet avec les recette et array vide
        });
      }),
      tap(recipes => {

        // if (recipes.length === 0) {
        //   this.recipeService.setRecipe(this.recipeService.getDummyRecipes())
        // }
        this.recipeService.setRecipe(recipes);
      }) //le tap operator permet de faire des operations sans modifier les données acheminées à travers l'observable.);
    );

    //take() -->
    //je veux prendre la 1ere seule valeur de mon obsersable apres ça unsubscribe automatiquement
    //ici je veux le dernier user seulement, je n'en veux pas d'autre,
    //Je veux juste les obtenir à la demande quand on appelle fetch

    //exhaustMap() -->
    //il va attendre que le premier observable se termine, il récupère la valeur de celui-ci dans user
    //nous obtenons les données de cet observable précédent et nous y renvoyons maintenant un nouvel observable
    //qui remplacera alors notre observable précédent dans toute cette chaîne observable.

    //il faut clairement dire au TypeScript que l'on connait le type de donné à récupérer
    // on va donc ajouter à la méthode get qui prendre une annotation generique : <Recipe[]>
    // L'assertion de type permet de définir le type d'une valeur et d'indiquer au compilateur de ne pas l'inférer ( déduire tout seul)
  }
}
