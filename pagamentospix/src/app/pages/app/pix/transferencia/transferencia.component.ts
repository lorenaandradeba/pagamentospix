import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-transferencia',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule ],
  templateUrl: './transferencia.component.html',
  styleUrl: './transferencia.component.css'
})
export class TransferenciaComponent {

  transferenciaForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.transferenciaForm = this.fb.group({
      keyType: ['']
    });
  }
  onSubmit() {
    console.log('Selected key type:', );}

    formGroup() {
      console.log('Selected key type:', );
    }
}
