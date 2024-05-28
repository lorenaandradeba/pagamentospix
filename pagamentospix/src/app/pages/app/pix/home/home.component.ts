import { CommonModule } from '@angular/common';
import { Component, Input, input } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent  {
  nome: string;
  src: string;
  saldo: string;
  barra: string;
  constructor() { 
    this.nome = 'Fulano';
    this.src = "/assets/icons/fulano.svg";
    this.barra = "/assets/icons/progresso.svg";
    this.saldo = '100,00';
  }
}
