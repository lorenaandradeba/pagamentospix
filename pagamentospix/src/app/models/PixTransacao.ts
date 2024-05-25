export interface PixTransacao {
    IdPixTransacao: string;
    Valor: number;
    Data: Date;
    ChaveDeSeguranca: string;
    chavePixOrigem: string;
    chavePixDestino: string;
  }