import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthenticationService } from '../../services/auth/authentication.service';
import { BancoService } from '../../services/banco.service';
import { ContaPessoa } from '../../models/ContaPessoa';

@Component({
  selector: 'app-perfil',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})
export class PerfilComponent implements OnInit {
  contaPessoa?: ContaPessoa;
  perfilForme: FormGroup;
  agencia: any;
  conta: any;
  idUsuario: string = '';

  constructor(private fb: FormBuilder,
              private authService: AuthenticationService,
              private bancoService: BancoService) {
    this.perfilForme = this.fb.group({
      nome: ['', Validators.required],
      cpf: ['', Validators.required],
      telefone: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      senha: ['**********', Validators.required],
    });
  }

  ngOnInit(): void {
    this.idUsuario = this.authService.getUsuarioAutenticado();
    if (this.idUsuario !== '') {
      this.bancoService.getContaPessoa(this.idUsuario).subscribe((resposta: any) => {
        if (resposta) {
          const chave = Object.keys(resposta)[0]; 
          const pessoaResp = resposta[chave]; 
          this.contaPessoa = pessoaResp;
          this.conta = this.contaPessoa?.Numero;
          this.agencia = this.contaPessoa?.Agencia;
          this.atualizarFormulario();
        }
      });
    }
  }

  atualizarFormulario() {
    this.perfilForme.patchValue({
      nome: this.contaPessoa?.Nome,
      cpf: this.contaPessoa?.CPF,
      telefone: this.contaPessoa?.telefone,
      email: this.contaPessoa?.email,
      
      senha: '**********',
    });
  }

  onSubmit() {
    console.log(this.perfilForme.value);
  }
}
