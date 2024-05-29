import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Pix } from '../../../../models/Pix';
import { PixTransacao } from '../../../../models/PixTransacao';

@Component({
  selector: 'app-extrato',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './extrato.component.html',
  styleUrl: './extrato.component.css'
})
export class ExtratoComponent {
  traferencia: PixTransacao[] = [{
    IdPixTransacao: "1",
    Valor: 100,
    Data: new Date(),
    ChaveDeSeguranca: "12345678901234567890123456789012",
    chavePixOrigem: "12345678901234567890123456789012",
    chavePixDestino: "12345678901234567890123456789012"
    }, 
    {
    IdPixTransacao: "2",
    Valor: 100,
    Data: new Date(),
    ChaveDeSeguranca: "12345678901234567890123456789012",
    chavePixOrigem: "12345678901234567890123456789012",
    chavePixDestino: "12345678901234567890123456789012"
    }, 
    {
    IdPixTransacao: "3",
    Valor: 100,
    Data: new Date(),
    ChaveDeSeguranca: "12345678901234567890123456789012",
    chavePixOrigem: "123456789012345678901234567890123",
    chavePixDestino: "12345678901234567890123456789012"
    }
  ];
  minhaChavePix: string = "123456789012345678901234567890123";

}
