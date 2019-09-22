import { Component, OnInit } from "@angular/core";

import { Recipe } from "../recipe.model";

import { RecipeService } from "../recipe.service";
import { ActivatedRoute, Params, Router } from '@angular/router';



@Component({
  selector: "app-recipe-detail",
  templateUrl: "./recipe-detail.component.html",
  styleUrls: ["./recipe-detail.component.css"]
})
export class RecipeDetailComponent implements OnInit {
  recipe: Recipe;
  id: number;

  constructor(
    private recipeService: RecipeService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  onAddToShoppingList() {
    this.recipeService.addIngredientToShoppingList(this.recipe.ingredients);
  }

  ngOnInit() {
    this.route.params
      .subscribe(
        (params: Params) => {
          this.id = +params['id']; //le 'params' est une string , le petit + convertit ma chaine en nombre
          this.recipe = this.recipeService.getRecipeById(this.id);
        }
      )
    // pour réagir directement à un changement d'id à l'initialisation du composant
    // this.recipe = this.recipeService.getRecipeById(+this.route.params['id']);
  }

  onEdit() {
    this.router.navigate(['edit'], {relativeTo: this.route });
    // this.router.navigate(['../', this.id, 'edit'], {relativeTo: this.route});
  }

  onDelete(id: number) {
    this.recipeService.deleteRecipe(id);

    this.router.navigate(['/recipes']);
    // .(['../'],{relativeTo: this.route}) et .(['/recipes']) revient au meme
  }
}
