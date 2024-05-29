import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-visualizar-chave-pix',
  templateUrl: './visualizar-chave-pix.component.html',
  standalone: true,
  imports: [CommonModule],
  styleUrls: ['./visualizar-chave-pix.component.css']
})
export class VisualizarChavePixComponent {
  pixKeys: { type: string, key: string }[] = [];

  constructor() {
    // Criando um array de chaves Pix
    this.pixKeys = [
      { type: 'CPF', key: '123.456.789-00' },
      { type: 'Email', key: 'exemplo@dominio.com' },
      { type: 'Telefone', key: '+5511999999999' },
      { type: 'Aleatória', key: 'a1b2c3d4e5f6g7h8i9j0k1l2m3n4o5p6' }
    ];
  }
}
