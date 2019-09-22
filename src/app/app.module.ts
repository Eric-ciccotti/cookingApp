import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";

import { HttpClientModule } from "@angular/common/http";

import { AppComponent } from "./app.component";
import { HeaderComponent } from "./header/header.component";

import { AppRoutingModule } from "./app-routing.module";
import { ShoppingListModule } from './shopping-list/shopping-list.module';
import { SharedModules } from './shared/shared.modules';
import { CoreModule } from './core.module';
import { AuthModule } from './auth/auth.module';
import { LoggingService } from './logging.service';

@NgModule({
  declarations: [ // composant , directive, service
    AppComponent,
    HeaderComponent,
  ],
  imports: [  // module suplémentaire que je veux importer
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    SharedModules,
    CoreModule
  ],
  bootstrap: [AppComponent],
  // providers: [LoggingService]
})
export class AppModule {}
