import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Pix } from '../../../../models/Pix';
import { PixTransacao } from '../../../../models/PixTransacao';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
@Component({
  selector: 'app-extrato',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
  templateUrl: './extrato.component.html',
  styleUrl: './extrato.component.css'
})
export class ExtratoComponent implements OnInit {
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
    },
    {
    IdPixTransacao: "3",
    Valor: 100,
    Data: new Date(),
    ChaveDeSeguranca: "12345678901234567890123456789012",
    chavePixOrigem: "123456789012345678901234567890123",
    chavePixDestino: "12345678901234567890123456789012"
    },
    {
    IdPixTransacao: "3",
    Valor: 100,
    Data: new Date(),
    ChaveDeSeguranca: "12345678901234567890123456789012",
    chavePixOrigem: "123456789012345678901234567890123",
    chavePixDestino: "12345678901234567890123456789012"
    },
    {
    IdPixTransacao: "3",
    Valor: 100,
    Data: new Date(),
    ChaveDeSeguranca: "12345678901234567890123456789012",
    chavePixOrigem: "123456789012345678901234567890123",
    chavePixDestino: "12345678901234567890123456789012"
    },
    {
    IdPixTransacao: "3",
    Valor: 100,
    Data: new Date(),
    ChaveDeSeguranca: "12345678901234567890123456789012",
    chavePixOrigem: "123456789012345678901234567890123",
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
  dataInicial: string = new Date().toISOString().split('T')[0];
  dataFinal: string = new Date().toISOString().split('T')[0];

  ngOnInit(): void {
    const today = new Date();
    this.dataFinal = today.toISOString().split('T')[0];

    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(today.getDate() - 30);
    this.dataInicial = thirtyDaysAgo.toISOString().split('T')[0];
  }

}
