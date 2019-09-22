
//un "CORE MODULE" n'est necessaire que si on a un interceptor par exemple,
//utiliser @Injectable({provider: root}) pour un service est une meilleur pratique
//et evite devoir déclarer le service dans le app.module > core.module

import { NgModule } from "@angular/core";

import { ShoppingListService } from "./shopping-list/shopping-list.service";
import { RecipeService } from "./recipes/recipe.service";
import { AuthInterceptorService } from "./auth/auth-intercepetor.service";

import { HTTP_INTERCEPTORS } from "@angular/common/http";

@NgModule({
  providers: [
    // mes services
    ShoppingListService,
    RecipeService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptorService,
      multi: true
    }
  ]
})

export class CoreModule {}
