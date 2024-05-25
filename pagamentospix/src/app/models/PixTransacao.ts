export interface PixTransacao {
    IdPixTransacao: string;
    Valor: number;
    Data: Date;
    ChaveDeSeguranca: string;
    IdContaOrigem: string;
    chavePixDestino: string;
  }