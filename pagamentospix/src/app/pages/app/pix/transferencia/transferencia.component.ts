import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, RequiredValidator, Validators } from '@angular/forms';
import { AppMaskDirective } from '../../../../pipi/app-mask.directive';

@Component({
  selector: 'app-transferencia',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, AppMaskDirective],
  templateUrl: './transferencia.component.html',
  styleUrl: './transferencia.component.css'
})
export class TransferenciaComponent {

  transferenciaForm: FormGroup;
  //empresção lambida
  Banco = {
    Insituicao: "Banco do Brasil S.A.",
    Agencia: "19-1",
    Conta: "10.9956-9",
    Nome: "Daniel Oliveira da Silva"
  };

  constructor(private fb: FormBuilder) {
    this.transferenciaForm = this.fb.group({
      valorTransferencia: ['', Validators.required],
      chavePix: ['', Validators.required],

    });
  }
  onSubmit() {
   if (this.transferenciaForm.valid) {
    console.log(this.transferenciaForm.value);
   }
  }

}
