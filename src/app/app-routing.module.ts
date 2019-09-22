import { NgModule } from "@angular/core";
import { RouterModule, Routes, PreloadAllModules } from "@angular/router";

const appRoutes: Routes = [
  {path: '', redirectTo: '/recipes', pathMatch: 'full'},
  {path: 'shoppingList', loadChildren: ()=> import('./shopping-list/shopping-list.module').then(m => m.ShoppingListModule)},
  {path: 'auth', loadChildren: ()=> import('./auth/auth.module').then(m => m.AuthModule)},
  {path: 'recipes', loadChildren: ()=> import('./recipes/recipes.module').then(m => m.RecipesModule)}  //lazy loading module ( on va charger uniquement le module quand on en a besoin , pas avant)
]

@NgModule({
  imports: [RouterModule.forRoot(appRoutes, {preloadingStrategy: PreloadAllModules})],
  //preloadAllModules va pré-charger les lazy loading module :  a fast initial load and thereafter, fast subsequent loads.
  //creates a module that contains all the directives, the given routes, and the router service itself.
  exports: [RouterModule]
})


export class AppRoutingModule {

}
