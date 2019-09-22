export class User {
  constructor(
    public email: string,
    public id: string,
    private _token: string,
    private _tokenExpirationDate: Date
  ) {}

  get token() {
    if (!this._tokenExpirationDate || new Date() > this._tokenExpirationDate) {
      return null;
      console.log('DATE NUll');
    }
    // si la date du token d'expiration n'existe pas OU
    // si l'heure actuelle ( pas seulement la date ) est supérieur à ce token = le token est invalide
    return this._token;
  }
}


