import {
  CanActivate,
  RouterStateSnapshot,
  ActivatedRouteSnapshot,
  Router,
  UrlTree
} from "@angular/router";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { AuthService } from "./auth.service";
import { map, tap, take } from "rxjs/operators";

//activer la garde devant les routes que nous voulons protéger.
// on s'assure de pouvoir acceder a la page des recette Uniquement si on est loggué, sinon on est redirigé vers la page de loggin

@Injectable({ providedIn: "root" })

export class AuthGard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    router: RouterStateSnapshot
  ):
    | boolean
    | UrlTree
    | Promise<boolean | UrlTree>
    | Observable<boolean | UrlTree>
    {
      return this.authService.user.pipe( //ON soucris au user service ici
      take(1), // prendre la dernière valeur utilisateur, puis de se désabonne
      map(user => {
        const isAuth = !!user; // this.isAuthenticated = !user ? false : true -->meme chose que !!user
        if (isAuth) {
          return true;
        }
        return this.router.createUrlTree(["/auth"]);
      })
      // tap(isAuth => {
      //   if (!isAuth) {
      //     this.router.navigate(["/auth"]);
      //   }
      // })
    );
  }
}
