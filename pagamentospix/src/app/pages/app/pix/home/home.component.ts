import { CommonModule } from '@angular/common';
import { Component, Input, OnInit, input } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Usuario } from '../../../../models/Usuario';
import { Pessoa } from '../../../../models/Pessoa';
import { Conta } from '../../../../models/Conta';
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
  email: string ='';
  pessoaNome: string ='';
  pessoaId: string ='';
  conta: Conta | null = null;
  constructor(
    private authService: AuthenticationService,
    private bancoService: BancoService
  ) {}
  ngOnInit(): void {
    this.email = this.authService.getUsuarioAutenticado();
    console.log('email: ', this.email);
    if (this.email !== '') {
      this.bancoService.getPessoaPorEmail(this.email).subscribe(pessoaResp => {
        if (pessoaResp) {
          console.log('pessoa: ', pessoaResp);
          this.pessoaNome = pessoaResp.Nome;
          this.nome = pessoaResp.Nome;
          this.src = `/assets/icons/avatar.svg`;
        }
        console.log('pessoa: ', pessoaResp);
      });
      
      this.bancoService.getContaPorEmail(this.email).subscribe(contaResp => {
          this.conta = contaResp;
          this.saldo = contaResp? contaResp.Saldo.toFixed(2) : '0.00';
          console.log('conta: ', contaResp);
      });
        
      
    }
  }
}
