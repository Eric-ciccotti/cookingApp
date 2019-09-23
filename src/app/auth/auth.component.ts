import { Component, ComponentFactoryResolver, ViewChild, OnDestroy } from "@angular/core";
import { NgForm } from "@angular/forms";
import { Observable, Subscription } from "rxjs";
import { Router } from "@angular/router";

import { AuthService, AuthResponseData } from "./auth.service";

import { AlertComponent } from "../shared/alert/alert.component";
import { PlaceHolderDirective } from '../shared/placeholder/placeholder.directive';

@Component({
  selector: "app-auth",
  templateUrl: "./auth.component.html",
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnDestroy {
  isLoginMode = true;
  isLoading = false;
  // error: string = null;
  private closeSub: Subscription;

  @ViewChild(PlaceHolderDirective, { static: false}) alertHost: PlaceHolderDirective;  // @ViewChild trouvera alors la première occurrence de cette directive dase le DOM

  constructor(private authService: AuthService, private router: Router, private componentFactoryResolver: ComponentFactoryResolver) {}

  onSwitchMode() {
    this.isLoginMode = !this.isLoginMode;
  }

  onSubmit(form: NgForm) {
    if (!form.valid) {
      return;
    }
    //extra validation step, au cas ou un mec modifie le bouton "disable" sur ON dans la console

    const email = form.value.email;
    const password = form.value.password;

    let authObs: Observable<AuthResponseData>;

    this.isLoading = true;
    //on a passé la validtion du formulaire donc Loading est true

    if (this.isLoginMode) {
      authObs = this.authService.login(email, password);
    } else {
      authObs = this.authService.signUp(email, password);
    }

    //pour eviter d'avoir du code partout on créer une variable qui va stocker un observable
    //login ou signup renvoi des observables, aprés on souscris à l'un au l'autre via la variable dédidée

    authObs.subscribe(
      responseData => {
        console.log(responseData);
        this.isLoading = false;
        this.router.navigate(['/recipes']);
      },
      errorMessage => {
        console.log(errorMessage);
        // this.error = errorMessage;
        this.showErrorAlert(errorMessage);
        this.isLoading = false;
      }
    );
    form.reset();
  }

  onHandleError() {
    // this.error = null;
  }

  ngOnDestroy() { // pour s'assurer que la subscription par rapport au composant dynamique soit bien supprimée
    if (this.closeSub) {
      this.closeSub.unsubscribe()
    }
  }

  //Creation de composant dynamique programmatically
  private showErrorAlert(errorMessage: string) {
    const AlertComponentFactory = this.componentFactoryResolver.resolveComponentFactory(AlertComponent);
    // on créer une 'factory' basée sur le 'AlertComponent'
    const hostViewContainerRef = this.alertHost.viewContainerRef;
    // on récupère la viewContainer référence ( a l'aide de la placeHolder directive)
    hostViewContainerRef.clear();
    // on détruit toute les vue au cas ou
    const componentRef = hostViewContainerRef.createComponent(AlertComponentFactory);
    // et la a l'endroit ou y a une directive appPlaceHolder(alertHost)
    componentRef.instance.message = errorMessage;
    this.closeSub = componentRef.instance.close.subscribe(() => {
      this.closeSub.unsubscribe();
      hostViewContainerRef.clear()
    })
  }
}
