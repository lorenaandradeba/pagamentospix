export class Usuario {
    constructor(
        public email: string,
        public id: string,
        public _token: string,
        public _tokenExpirationDate: Date
    ) {

    }

    get token() {
        if (!this._tokenExpirationDate || new Date() > this._tokenExpirationDate) {
            return null;
        }
        return this._token;
    }
    get tokenExpirationDate() {
        return this._tokenExpirationDate;
    }
}