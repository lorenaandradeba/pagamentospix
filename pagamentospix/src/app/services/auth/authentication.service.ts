// import { Injectable } from '@angular/core';
// import { BehaviorSubject, Observable, tap } from 'rxjs';
// import { HttpClient } from '@angular/common/http';
// import { Usuario } from '../../models/Usuario';
// interface AuthResponseData {
//   idToken: string;
//   email: string;
//   refreshToken: string;
//   expiresIn: string;
//   localId: string;
//   registered?: boolean;
// }
// @Injectable({
//   providedIn: 'root'
// })
// export class AuthenticationService {
//   private readonly apiKey = 'AIzaSyBGjSJ33ziaOWx8Usf4PBttakCPNTwJXUw';
//   private readonly signUpUrl = `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${this.apiKey}`;
//   private readonly signInUrl = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${this.apiKey}`;

//   private userSubject = new BehaviorSubject<Usuario | null>(null);
//   private estaAutenticado = false;
//   constructor(private http: HttpClient) {
//     const userData = sessionStorage.getItem('userData');
//     if (userData) {
//       this.userSubject.next(JSON.parse(userData));
//     }
//   }
  
//   getPessoa(): Observable<Usuario | null> {
//     return this.userSubject.asObservable();
//   }
  
//   logout(): void {
//     this.userSubject.next(null);
//     sessionStorage.removeItem('userData');
//     this.setAutenticado(false);
//   }
  
//   signUpUser(email: string, password: string): Observable<AuthResponseData> {
//     return this.authenticate(email, password, this.signUpUrl);
//   }

//   loginUser(email: string, password: string): Observable<AuthResponseData> {
//     return this.authenticate(email, password, this.signInUrl);
//   }

//   private authenticate(email: string, password: string, url: string): Observable<AuthResponseData> {
//     return this.http.post<AuthResponseData>(url, {
//       email,
//       password,
//       returnSecureToken: true
//     }).pipe(
//       tap(resData => {
//         const expiracaoData = new Date(new Date().getTime() + +resData.expiresIn * 1000);
//         console.log(expiracaoData);
//         const user = new Usuario(
//           resData.email,
//           resData.localId,
//           resData.idToken,
//           expiracaoData
//         );
//         console.log(user);
//         this.userSubject.next(user);
//         sessionStorage.setItem('userData', JSON.stringify(user));
//         console.log(this.userSubject);
//         this.setAutenticado(true);
//       })
//     );
//   }

//   private setAutenticado(isAuthenticated: boolean): void {
//     this.estaAutenticado = isAuthenticated;
//     console.log('estaAutenticado' + this.estaAutenticado);
//   }
//   getToken(): string | null {
//     const user = this.userSubject.value;
//     console.log(user);
//     return user ? user.token : null;
//   }
// }

import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Usuario } from '../../models/Usuario';
import { catchError, tap } from 'rxjs/operators';

interface AuthResponseData {
  idToken: string;
  email: string;
  refreshToken: string;
  expiresIn: string;
  localId: string;
  registered?: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  private readonly apiKey = 'AIzaSyBGjSJ33ziaOWx8Usf4PBttakCPNTwJXUw';
  private readonly signUpUrl = `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${this.apiKey}`;
  private readonly signInUrl = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${this.apiKey}`;

  private userSubject = new BehaviorSubject<Usuario | null>(null);
  private estaAutenticado = false;

  constructor(private http: HttpClient) {
    const userData = sessionStorage.getItem('userData');
    if (userData) {
      this.userSubject.next(JSON.parse(userData));
    }
  }

  getPessoa(): Observable<Usuario | null> {
    return this.userSubject.asObservable();
  }

  logout(): void {
    this.userSubject.next(null);
    sessionStorage.removeItem('userData');
    this.setAutenticado(false);
  }

  signUpUser(email: string, password: string): Observable<AuthResponseData> {
    return this.authenticate(email, password, this.signUpUrl);
  }

  loginUser(email: string, password: string): Observable<AuthResponseData> {
    return this.authenticate(email, password, this.signInUrl);
  }

  private authenticate(email: string, password: string, url: string): Observable<AuthResponseData> {
    return this.http.post<AuthResponseData>(url, {
      email,
      password,
      returnSecureToken: true
    }).pipe(
      tap(resData => {
        const expiracaoData = new Date(new Date().getTime() + +resData.expiresIn * 1000);
        const user = new Usuario(
          resData.email,
          resData.localId,
          resData.idToken,
          expiracaoData
        );
        this.userSubject.next(user);
        sessionStorage.setItem('userData', JSON.stringify({
          email: user.email,
          id: user.id,
          _token: user._token,
          tokenExpirationDate: user.tokenExpirationDate.toISOString()
        }));
        this.setAutenticado(true);
      }),
      catchError(error => {
        console.error('Authentication error: ', error);
        if (error.error && error.error.error) {
          console.error('Firebase error code: ', error.error.error.message);
        }
        return throwError(error);
      })
    );
  }

  private setAutenticado(isAuthenticated: boolean): void {
    this.estaAutenticado = isAuthenticated;
    console.log('estaAutenticado' + this.estaAutenticado);
  }
  getToken(): string | null {
    const user = this.userSubject.value;
    console.log(user);
    return user ? user.token : null;
  }
  getUsuarioAutenticado(): string  {
    const user = this.userSubject.value;
    console.log(user);
    return user ? user.id : '';
  }
}
