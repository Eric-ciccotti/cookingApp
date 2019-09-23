import { Injectable } from "@angular/core";
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { catchError, tap } from "rxjs/operators";
import { throwError, BehaviorSubject } from "rxjs";
import { Router } from "@angular/router";
import { User } from "./user.model";
import { environment } from '../../environments/environment';

export interface AuthResponseData {
  kind: string;
  idToken: string;
  email: string;
  refreshToken: string;
  expiresIn: string;
  localId: string;
  registered?: boolean; //la sign up request n'en pas besoin , seulement la sign in donc on le met en mode pas obligatoire
}
// pas obligatoire mais bonne pratique de définir l'interface des données que je vais recevoir
// en dessous je dis que ma requete POST va me donner une réponse qui aura ce format
// ceci est utilise pour bosser correctement avec la réponse de l'api

@Injectable({
  providedIn: "root"
})
export class AuthService {

  private tokenExpirationTimer: any;

  user = new BehaviorSubject<User>(null);
  // BehaviorSubject a pour caractéristique de stocker la valeur «actuelle».
  // Cela signifie que vous pouvez toujours obtenir directement la dernière valeur émise à partir de BehaviorSubject.

  // next -> to emit a value
  // subscribe -> to be informed about new values.

  constructor(private http: HttpClient, private router: Router) {}

  signUp(email: string, password: string) {
    return this.http
      .post<AuthResponseData>(
        "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=" + environment.firebaseAPIkey,
        {
          email: email,
          password: password,
          returnSecureToken: true
        }
      )
      .pipe(
        catchError(errorRes => this.handleError(errorRes)),
        tap(resData => {
          this.handleAuthentication(
            resData.email,
            resData.localId,
            resData.idToken,
            +resData.expiresIn
          );
        })
      );
  }

  login(email: string, password: string) {
    return this.http
      .post<AuthResponseData>(
        "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=" + environment.firebaseAPIkey,
        {
          email: email,
          password: password,
          returnSecureToken: true
        }
      )
      .pipe(
        catchError(errorRes => this.handleError(errorRes)),
        tap(resData => {
          this.handleAuthentication(
            resData.email,
            resData.localId,
            resData.idToken,
            +resData.expiresIn
          );
        })
      );
  }

  logout() {
    this.user.next(null);
    this.router.navigate(["/auth"]);
    localStorage.removeItem('userData');
    if (this.tokenExpirationTimer) {
      clearTimeout(this.tokenExpirationTimer);
    }
    this.tokenExpirationTimer = null;
  }

  autoLogout(expirationDuration: number) {
    this.tokenExpirationTimer = setTimeout(() => {
      this.logout();
    }, expirationDuration);
  }

  autoLogin() {
    // data qu'on récupère du data storage
    const userData: {
      email: string;
      id: string;
      _token: string;
      _tokenExpirationDate: string;
    } = JSON.parse(localStorage.getItem('userData'));

    console.log('userData du storage: ', userData);
    // prendr le JSON stringifié et le reconvertit en object javascript

    if (!userData) {
      return;
    }

    // on recrée un nouvelle objet User a partir du json
    const loadedUser = new User(
      userData.email,
      userData.id,
      userData._token,
      new Date(userData._tokenExpirationDate)
      // il faut reconvertir la date en un objet date
    );

    console.log('objet loadedUser: ', loadedUser);


    if (loadedUser.token) {
      // le getter dans le model 'user' s'occupe de verifier si le token est valide

      this.user.next(loadedUser)
      // l'utlisateur devient le "loaderUser", on émet l'evement pour qu'on puisse soucrire dessus après

      const expirationDate = new Date(userData._tokenExpirationDate).getTime() - new Date().getTime();
      // futur tps d'expiration - tps actuelle = tps restant
      console.log('expiration apres auto login: ', expirationDate);

      this.autoLogout(expirationDate);
    }
  }

  private handleAuthentication(
    email: string,
    userId: string,
    token: string,
    expiresIn: number // tps en seconde
  ) {
    console.log('expirnesin quand il arrive:', expiresIn);

    const expirationDate = new Date(new Date().getTime() + expiresIn * 1000);
    //  objet date = la date actuelle en millisecond + (la date d'expiration en s * 1000 (pour mettre en milisecond))

    const user = new User(email, userId, token, expirationDate);
    console.log('user crée: ',user);

    // construction d'un utilisateur avec les données que l'on reçois du back (firebase ici)
    this.user.next(user);
    // on emet notre evenement user

    this.autoLogout(expiresIn * 1000),
    // j'active l'auto logout

    localStorage.setItem("userData", JSON.stringify(user));
    // je stock les données de mon user sous forme de 'string' (du text) avec JSON.stringify
  }

  private handleError(errorRes: HttpErrorResponse) {
    let errorMessage = "An unknow error occured!";

    if (!errorRes.error || !errorRes.error.error) {
      return throwError(errorMessage); //on va "throw" un nouvelle observable avec le message above
    }
    //gestion des error si on a une erreur reseau par exemple, qui ne figure pas dans l'object 'errorRes'

    switch (errorRes.error.error.message) {
      case "EMAIL_EXISTS":
        errorMessage = "The email address is already in use by another account";
        break;
      case "INVALID_PASSWORD":
        errorMessage = "The password is invalid";
        break;
      case "EMAIL_NOT_FOUND":
        errorMessage =
          "There is no user record corresponding to this identifier";
        break;
    }
    return throwError(errorMessage);
  }
  // catchError cette méthode renvoi un observable qui va passé dans la méthode privée handleError
  // cette méthode renvoi 'throwError' ( un autre obersavle) on souscris ensuite a cette observable dans le fichier auth.component.ts
}

// EXEMPLE POUR ILLUSTRER LE FAIT QU'ON EST PAS OBLIGE D'UTILISER LA FONCTION DE CALLBACK EN J.S , JE PEUX PASSER LA REF DE LA FNCTION DIRECT
// const myCustomFunction = callback => callback('foo');
// myCustomFunction(x => console.log(x))       // prints 'foo'
// myCustomFunction(console.log)

// .pipe(catchError(this.handleError))
// --> même chose on peu aussi directement envoyer la référence à la fonction (this.handleError) sans la fonction de callback (errorRes => .... )
