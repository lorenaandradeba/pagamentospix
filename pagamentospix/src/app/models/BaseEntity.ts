export interface Pessoa {
    IdPessoa: string;
    Nome: string;
    CPF: string;
    Telefone: string;
    Identidade: string;
    email: string;
    senha: string;
  }
  export interface Conta {
    IdConta: string;
    IdPessoa: string;
    IdPix: string;
    Numero: string;
    Agencia: string;
    Saldo: number;
  }
  
  export interface PixTransacao {
    IdPixTransacao: string;
    Valor: number;
    Data: Date;
    ChaveDeSeguranca: string;
    chavePixOrigem: string;
    chavePixDestino: string;
  }
  export interface Pix {
    IdPix: string;
    IdConta: string;
    IdPessoa: string;
    IdTipoPix: string;
    DataCriacao: Date;
    Status: boolean;
    ChavePix: string[]; // Array de chaves Pix
    TransacoesPix: PixTransacao[]; // Array de transações Pix
  }
  
  export interface TipoPix {
    IdTipoPix: string;
    NomeTipo: string;
  }