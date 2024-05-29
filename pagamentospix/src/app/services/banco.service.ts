import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthenticationService } from './auth/authentication.service';
import { Observable, catchError, map, throwError } from 'rxjs';
import { ContaPessoa } from '../models/ContaPessoa';
import { Pix } from '../models/Pix';

@Injectable({
  providedIn: 'root'
})
export class BancoService {
  apiURL = 'https://pagamentospix-ad928-default-rtdb.firebaseio.com';
  private generatedAccountNumbers = new Set<number>();
  
  constructor(private http: HttpClient, private authService: AuthenticationService) { }

  adicionarContaPessoa(contapessoa: ContaPessoa): Observable<any> {
    const token = this.authService.getToken();
    const url = `${this.apiURL}/contasPessoa/${contapessoa.IdUsuario}.json?auth=${token}`;
    console.log('URL usada para adicionar ContaPessoa:', url); // Adicionado para depuração
    return this.http.post(url, contapessoa).pipe(
      catchError(error => {
        console.error('Erro ao adicionar ContaPessoa:', error); // Log de erro mais detalhado
        return throwError(error);
      })
    );
  }
  gerarNumeroConta(): number {
    let numero: number;
    do {
      numero = Math.floor(100000 + Math.random() * 900000);
    } while (this.generatedAccountNumbers.has(numero));
    this.generatedAccountNumbers.add(numero);
    return numero;
  }
  getContaPessoa(idUsuario: string): Observable<ContaPessoa> {
    const token = this.authService.getToken();
    const url = `${this.apiURL}/contasPessoa/${idUsuario}.json?auth=${token}`;
    console.log('URL usada para adicionar ContaPessoa:', url); // Adicionado para depuração
    return this.http.get<ContaPessoa>(url).pipe(
      catchError(error => {
        console.error('Error fetching ContaPessoa:', error);
        return throwError(error);
      })
    );
  }
  cadastrarChavePix(idUsuario: string, chavePix: string, tipoPix: string): Observable<any> {
    const token = this.authService.getToken();
    console.log(token);
    const url = `${this.apiURL}/pix/${idUsuario}.json?auth=${token}`;
    const pix: Pix = {
        IdUsuario: idUsuario,
        IdTipoPix: tipoPix,
        ChavePix: chavePix,
        DataCriacao: new Date(),
        Status: 'Ativo'
    };
    console.log('URL usada para cadastrar chave PIX:', url); // Para depuração
    return this.http.post(url, pix).pipe(
        catchError(error => {
            console.error('Erro ao cadastrar chave PIX:', error);
            return throwError(error);
        })
    );
}
getTodasChavesPix(idUsuario: string): Observable<Pix[]> {
  const token = this.authService.getToken();
  const url = `${this.apiURL}/pix/${idUsuario}.json?auth=${token}`;
  console.log('URL usada para obter todas as chaves PIX:', url);
  return this.http.get<{ [key: string]: Pix }>(url).pipe(
    map((resposta: { [key: string]: Pix }) => {
      const chaves = Object.values(resposta);
      console.log('Todas as chaves:', chaves);
      return chaves;
    }),
    catchError(error => {
      console.error('Erro ao obter todas as chaves PIX:', error);
      return throwError(error);
    })
  );
}



  
 }
