import { Component, OnInit, OnDestroy } from "@angular/core";

import { Recipe } from "../recipe.model";
import { RecipeService } from "../recipe.service";
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: "app-recipe-list",
  templateUrl: "./recipe-list.component.html",
  styleUrls: ["./recipe-list.component.css"]
})
export class RecipeListComponent implements OnInit, OnDestroy {
  recipes: Recipe[];
  subscription: Subscription;

  constructor(private RecipeService: RecipeService, private route: ActivatedRoute, private router: Router) {
  }

  ngOnInit() {
    this.recipes = this.RecipeService.getRecipes();
    this.subscription = this.RecipeService.recipeChanged.subscribe(
      (recipe: Recipe[]) => {
        this.recipes = recipe
      }
    );
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
