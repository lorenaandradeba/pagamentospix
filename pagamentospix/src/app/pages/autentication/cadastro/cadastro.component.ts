import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AppMaskDirective } from '../../../pipi/app-mask.directive';
import { switchMap } from 'rxjs';
import { ContaPessoa } from '../../../models/ContaPessoa';
import { Router } from '@angular/router';
import { AuthenticationService } from '../../../services/auth/authentication.service';
import { BancoService } from '../../../services/banco.service';


@Component({
  selector: 'app-cadastro',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, AppMaskDirective],
  templateUrl: './cadastro.component.html',
  styleUrls: ['./cadastro.component.css']
})
export class CadastroComponent implements OnInit {
  formCadastro!: FormGroup;

  constructor(private fb: FormBuilder,
    private router: Router,
    private authService: AuthenticationService,
    private bancoService: BancoService) { }
    
  ngOnInit(): void {
    this.formCadastro = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      cpf: ['', [Validators.required, Validators.pattern('^\\d{3}\\.\\d{3}\\.\\d{3}-\\d{2}$')]],
      telefone: ['', [Validators.required]],
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
      const email = this.formCadastro.value.email;
      const password = this.formCadastro.value.password;
      const numeroConta = this.bancoService.gerarNumeroConta();
      console.log('numeroConta: ' + numeroConta);
      this.authService.signUpUser(email, password).pipe(
        switchMap(responseData => {
          const contapessoa: ContaPessoa = {
            IdContaPessoa: '',
            IdUsuario: responseData.localId,
            Nome: `${this.formCadastro.value.firstName} ${this.formCadastro.value.lastName}`,
            CPF: this.formCadastro.value.cpf,
            telefone: this.formCadastro.value.telefone,
            email: this.formCadastro.value.email,
            senha: this.formCadastro.value.password,
            Numero: numeroConta, // Número da conta
            Agencia: 1234, // Agência da conta
            Saldo: 0 // Saldo inicial
          };
          console.log('Dados do SignUp Response:', responseData); // Adicionado para depuração
          return this.bancoService.adicionarContaPessoa(contapessoa);
        })
      ).subscribe({
        next: contaResponse => {
          console.log('Resposta da Conta:', contaResponse); // Adicionado para depuração
          this.router.navigate(['/app/home']);
        },
        error: (error: any) => {
          console.log('Error: ', error);
          if (error.error && error.error.error) {
            console.error('Firebase error code: ', error.error.error.message);
          }
        }
      });
    }
    console.log(this.formCadastro);
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
