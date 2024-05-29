import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthenticationService } from '../../services/auth/authentication.service';
import { BancoService } from '../../services/banco.service';
import { Pessoa } from '../../models/Pessoa';

@Component({
  selector: 'app-perfil',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})
export class PerfilComponent implements OnInit {
  pessoa?: Pessoa;
  perfilForme: FormGroup;
  agencia: any;
  conta: any;
  email: string = '';

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
    this.email = this.authService.getUsuarioAutenticado();
    if (this.email !== '') {
      this.bancoService.getPessoaPorEmail(this.email).subscribe(pessoaResp => {
        if (pessoaResp) {
          console.log('pessoa: ', pessoaResp);
          this.pessoa = pessoaResp;
          this.atualizarFormulario();
        }
      });
      
      this.bancoService.getContaPorEmail(this.email).subscribe(contaResp => {
        this.conta = contaResp?.Numero;
        this.agencia = contaResp?.Agencia;
        console.log('conta: ', contaResp);
      });
    }
  }

  atualizarFormulario() {
    this.perfilForme.patchValue({
      nome: this.pessoa?.Nome,
      cpf: this.pessoa?.CPF,
      telefone: this.pessoa?.telefone,
      email: this.pessoa?.email,
      senha: '**********',
    });
  }

  onSubmit() {
    console.log(this.perfilForme.value);
  }
}
