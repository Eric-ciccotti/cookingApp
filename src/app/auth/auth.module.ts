import { NgModule } from "@angular/core";
import { AuthComponent } from './auth.component';
import { FormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";
import { SharedModules } from '../shared/shared.modules';

@NgModule({
  declarations: [AuthComponent],
  imports: [
    FormsModule,
    SharedModules,
    RouterModule.forChild([
      {path: '', component: AuthComponent}
    ])
  ]
})
export class AuthModule {}
