import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-perfil',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './perfil.component.html',
  styleUrl: './perfil.component.css'
})
export class PerfilComponent {

  perfilForme: FormGroup;
  agencia: any;
  conta: any;

  constructor(private fb: FormBuilder) {
    if (localStorage.getItem('agencia') && localStorage.getItem('conta')) {
      this.agencia = localStorage.getItem('agencia');
      this.conta = localStorage.getItem('conta');
    }
    this.agencia = "000-0";
    this.conta = "0000-0";

    this.perfilForme = this.fb.group({
      nome: ['Daniel Oliveira da Silva', Validators.required],
      cpf: ['086.025.875-03', Validators.required],
      telefone: ['(73) 99862-6051', Validators.required],
      email: ['danieloliviera.s558@gmail.com', Validators.required],
      senha: ['**********', Validators.required],
    });
  }

  onSubmit() {
    console.log(this.perfilForme.value);
  }
}