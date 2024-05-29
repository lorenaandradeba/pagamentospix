import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';


@Component({
  selector: 'app-pix-cadastro',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './pix-cadastro.component.html',
  styleUrl: './pix-cadastro.component.css'

})
export class PixCadastroComponent {
  pixForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.pixForm = this.fb.group({
      keyType: ['']
    });
  }

  onSubmit() {
    console.log('Selected key type:', this.pixForm.value.keyType);
    // Adicione aqui a lógica para processar o valor selecionado
  }
}
