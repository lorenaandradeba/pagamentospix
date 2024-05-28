import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-cadastro',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './cadastro.component.html',
  styleUrls: ['./cadastro.component.css']
})
export class CadastroComponent implements OnInit {
  formCadastro!: FormGroup;

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.formCadastro = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      cpf: ['', [Validators.required, Validators.pattern('^\\d{3}\\.\\d{3}\\.\\d{3}-\\d{2}$')]],
      telefone: ['', [Validators.required, Validators.pattern('^\\(\\d{2}\\) \\d{5}-\\d{4}$')]],
      email: ['', [Validators.required, Validators.email]],
      password: [
        '',
        [
          Validators.required,
          Validators.minLength(8),
          Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])/)
        ]
      ],
      termos: [false, Validators.requiredTrue]
    });
  }

  onSubmit() {
    if (this.formCadastro.valid) {
      console.log('Formulário submetido', this.formCadastro.value);
      // Enviar dados do formulário
    }
  }

  get firstName() {
    return this.formCadastro.get('firstName');
  }

  get lastName() {
    return this.formCadastro.get('lastName');
  }

  get cpf() {
    return this.formCadastro.get('cpf');
  }

  get telefone() {
    return this.formCadastro.get('telefone');
  }

  get email() {
    return this.formCadastro.get('email');
  }

  get password() {
    return this.formCadastro.get('password');
  }

  get termos() {
    return this.formCadastro.get('termos');
  }
}
