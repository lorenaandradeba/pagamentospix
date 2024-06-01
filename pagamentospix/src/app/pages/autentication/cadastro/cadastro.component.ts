import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AppMaskDirective } from '../../../pipi/app-mask.directive';
import { Router } from '@angular/router';


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
    private router: Router,) { }

  ngOnInit(): void {
    this.formCadastro = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      cpf: [, [Validators.required, Validators.pattern('^\\d{3}\\.\\d{3}\\.\\d{3}-\\d{2}$')]],
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
    console.log(this.formCadastro);
  }

}
