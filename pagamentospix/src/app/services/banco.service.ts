import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Pessoa } from '../models/Pessoa';
import { Conta } from '../models/Conta';
import { AuthenticationService } from './auth/authentication.service';
import { Observable } from 'rxjs';

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
    return this.http.post(`${this.apiURL}/contas/${idPessoa}.json?auth=${token}`, conta);
  }
  gerarNumeroConta(): number {
    let numero: number;
    do {
      numero = Math.floor(100000 + Math.random() * 900000);
    } while (this.generatedAccountNumbers.has(numero));
    this.generatedAccountNumbers.add(numero);
    return numero;
  }
}
