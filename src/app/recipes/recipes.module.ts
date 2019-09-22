//voici un FEATURE MODULE

// un module Angular est un mécanisme permettant de :
// - regrouper des composants (mais aussi des services, directives, pipes etc...),
// -définir leurs dépendances,
// - et définir leur visibilité.

//angular traite chaque module de façon STANDALONE


import { NgModule } from '@angular/core';

import { RecipesComponent } from './recipes.component';
import { RecipeListComponent } from './recipe-list/recipe-list.component';
import { RecipeDetailComponent } from './recipe-detail/recipe-detail.component';
import { RecipeItemComponent } from './recipe-list/recipe-item/recipe-item.component';
import { RecipeStartComponent } from './recipe-start/recipe-start.component';
import { RecipeEditComponent } from './recipe-edit/recipe-edit.component';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { RecipesRoutingModule } from './recipes-routing.module';
import { SharedModules } from '../shared/shared.modules';

@NgModule({
  declarations: [
    RecipesComponent,
    RecipeListComponent,
    RecipeDetailComponent,
    RecipeItemComponent,
    RecipeStartComponent,
    RecipeEditComponent,
  ],
  imports: [
    RouterModule, SharedModules, ReactiveFormsModule, RecipesRoutingModule
    //Il faut ABSOLUMENT importer ces modules que j'utilise dans mon 'déclarations array', les importer dans le App.MODULE.ts ne suffit pas
    //La seule exception à la règle concerne les services
  ]
})
export class RecipesModule {}
