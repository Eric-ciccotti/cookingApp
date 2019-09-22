import { NgModule } from "@angular/core";
import { ShoppingListComponent } from "./shopping-list.component";
import { ShoppingEditComponent } from "./shopping-edit/shopping-edit.component";
import { FormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";
import { SharedModules } from '../shared/shared.modules';
import { LoggingService } from '../logging.service';

@NgModule({
  declarations: [ShoppingListComponent, ShoppingEditComponent],
  imports: [
    SharedModules,
    FormsModule,
    RouterModule.forChild([{
      path: "",
      component: ShoppingListComponent
    }]),
    // pas besoin exporter le RouterModule ( sauf is y a un fichier  qui gère les routes séparement ex: recipes-routing.modules.ts )
  ],
  // providers: [LoggingService]
})
export class ShoppingListModule {}
