import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
  styleUrls: ['./recipes.component.css'],
})
export class RecipesComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  // à chaque initialisation de ce component si un event 'recipe' est emit
  // le selectedRecipe va etre égale à la recette émise

}
