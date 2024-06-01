import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, RequiredValidator, Validators } from '@angular/forms';
import { AppMaskDirective } from '../../../../pipi/app-mask.directive';
import { ContaPessoa } from '../../../../models/ContaPessoa';
import { AuthenticationService } from '../../../../services/auth/authentication.service';
import { BancoService } from '../../../../services/banco.service';

@Component({
  selector: 'app-transferencia',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, AppMaskDirective],
  templateUrl: './transferencia.component.html',
  styleUrl: './transferencia.component.css'
})
export class TransferenciaComponent  implements OnInit {

  transferenciaForm: FormGroup;
  saldo: string = '';
  idUsuario: string ='';
  Banco = {
    Insituicao: '',
    Agencia: '',
    Conta: '',
    Nome: ''
  };
  
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


  constructor(private fb: FormBuilder,
    private authService: AuthenticationService,
    private bancoService: BancoService
  ) {
    this.transferenciaForm = this.fb.group({
      valorTransferencia: ['', Validators.required],
      chavePix: ['', Validators.required],

    });
  }
  ngOnInit(): void {
    this.idUsuario = this.authService.getUsuarioAutenticado();
    if (this.idUsuario !== '') {
      this.bancoService.getContaPessoa(this.idUsuario).subscribe((resposta: any) => {
        if (resposta) {
          const chave = Object.keys(resposta)[0]; 
          const pessoaResp = resposta[chave]; 
          this.saldo = pessoaResp.Saldo != null ? pessoaResp.Saldo.toFixed(2) : '0.00';
        }
      });      
    }
  }
  onSubmit() {
   if (this.transferenciaForm.valid) {
    console.log(this.transferenciaForm.value);
   }
  }

}
