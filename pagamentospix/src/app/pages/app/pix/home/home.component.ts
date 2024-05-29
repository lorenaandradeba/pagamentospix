import { CommonModule } from '@angular/common';
import { Component, Input, OnInit, input } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ContaPessoa } from '../../../../models/ContaPessoa';
import { AuthenticationService } from '../../../../services/auth/authentication.service';
import { BancoService } from '../../../../services/banco.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent  implements OnInit  {
  nome: string = '';
  src: string = '';
  saldo: string = '';
  barra: string = "/assets/icons/progresso.svg";
  idUsuario: string ='';
  contaPessoa: ContaPessoa = {
    IdUsuario: '',
    IdContaPessoa: '',
    Nome: '',
    CPF: '',
    email: '',
    senha: '',
    telefone: '',
    Numero: 0,
    Agencia: 0,
    Saldo: 0
};

  constructor(
    private authService: AuthenticationService,
    private bancoService: BancoService
  ) {}
  ngOnInit(): void {
    this.idUsuario = this.authService.getUsuarioAutenticado();
    if (this.idUsuario !== '') {
      this.bancoService.getContaPessoa(this.idUsuario).subscribe((resposta: any) => {
        if (resposta) {
          const chave = Object.keys(resposta)[0]; 
          const pessoaResp = resposta[chave]; 
          console.log('pessoa:', pessoaResp);
          this.nome = pessoaResp.Nome;
          console.log('nome' + this.nome);
          this.saldo = pessoaResp.Saldo != null ? pessoaResp.Saldo.toFixed(2) : '0.00';
          this.src = `/assets/icons/avatar.svg`;
        }
      });      
    }
  }
}
