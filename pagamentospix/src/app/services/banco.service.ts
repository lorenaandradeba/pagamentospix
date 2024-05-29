import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Pessoa } from '../models/Pessoa';
import { Conta } from '../models/Conta';
import { AuthenticationService } from './auth/authentication.service';
import { Observable, catchError, map, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BancoService {
  apiURL = 'https://pagamentospix-ad928-default-rtdb.firebaseio.com/';
  private generatedAccountNumbers = new Set<number>();
  
  constructor(private http: HttpClient, private authService: AuthenticationService) { }

  adicionarPessoa(pessoa: Pessoa): Observable<any> {
    const token = this.authService.getToken();
    return this.http.post(`${this.apiURL}/pessoa.json?auth=${token}`, pessoa);
  }
  adicionarConta(conta: Conta, idPessoa: string): Observable<any> {
    const token = this.authService.getToken();
    return this.http.post(`${this.apiURL}/contas.json?auth=${token}`, conta);
  }
  gerarNumeroConta(): number {
    let numero: number;
    do {
      numero = Math.floor(100000 + Math.random() * 900000);
    } while (this.generatedAccountNumbers.has(numero));
    this.generatedAccountNumbers.add(numero);
    return numero;
  }
  getPessoa(idPessoa: string): Observable<Pessoa> {
    const token = this.authService.getToken();
    return this.http.get<Pessoa>(`${this.apiURL}/pessoas/${idPessoa}.json?auth=${token}`);
  }

  getConta(idPessoa: string): Observable<Conta> {
    const token = this.authService.getToken();
    return this.http.get<Conta>(`${this.apiURL}/contas/${idPessoa}.json?auth=${token}`);
  }
  
  getPessoaPorEmail(email: string): Observable<Pessoa | null> {
    const token = this.authService.getToken();
    return this.http.get<{ [key: string]: Pessoa }>(`${this.apiURL}/pessoa.json?auth=${token}`).pipe(
      map(pessoasObj => {
        for (let key in pessoasObj) {
          let pessoa = pessoasObj[key];
          if (pessoa.email === email) {
            return pessoa;
          }
        }
        return null;
      }),
      catchError(err => {
        return throwError(err);
      })
    );
  }
  getContaPorEmail(email: string): Observable<Conta | null> {
    const token = this.authService.getToken();
    return this.http.get<{ [key: string]: Conta }>(`${this.apiURL}/contas.json?auth=${token}`).pipe(
      map(contasObj => {
        for (let key in contasObj) {
          let conta = contasObj[key];
          if (conta.email === email) {
            return conta;
          }
        }
        return null;
      }),
      catchError(err => {
        return throwError(err);
      })
    );
  }
  
 }
