import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-visualizar-chave-pix',
  templateUrl: './visualizar-chave-pix.component.html',
  standalone: true,
  imports: [CommonModule,RouterLink],
  styleUrls: ['./visualizar-chave-pix.component.css']
})
export class VisualizarChavePixComponent {
  pixKeys: { type: string, key: string }[] = [];

  constructor() {
    // Criando um array de chaves Pix
    this.pixKeys = [
      { type: 'CPF', key: '123.456.789-00' },
      { type: 'E-mail', key: 'exemplo@dominio.com' },
      { type: 'Celular', key: '+5511999999999' },
      { type: 'Chave Aleatória', key: 'a1b2c3d4e5f6g7h8i9j0k1l2m3n4o5p6' }
    ];
  }
  getPixIcon(type: string): string {
    switch(type) {
      case 'CPF':
        return '/assets/icons/cpficone.png';
      case 'E-mail':
        return '/assets/icons/email.png';
      case 'Chave Aleatória':
        return '/assets/icons/aleatoria.png';
      case 'Celular':
        return '/assets/icons/celular.png';
      default:
        return '/assets/icons/pix.png'; // ícone padrão para outros tipos de chave
    }
  }
}
