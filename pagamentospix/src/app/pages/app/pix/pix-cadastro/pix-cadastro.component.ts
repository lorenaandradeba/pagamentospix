import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { BancoService } from '../../../../services/banco.service';
import { AuthenticationService } from '../../../../services/auth/authentication.service';
import { ContaPessoa } from '../../../../models/ContaPessoa';
import { Pix } from '../../../../models/Pix';

@Component({
  selector: 'app-pix-cadastro',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './pix-cadastro.component.html',
  styleUrls: ['./pix-cadastro.component.css'] // Corrigido para styleUrls
})
export class PixCadastroComponent implements OnInit {
  pixForm: FormGroup;
  idUsuario: string = '';
  contaPessoa: ContaPessoa = {
    IdUsuario: '',
    IdContaPessoa: '',
    Nome: '',
    CPF: '',
    email: '',
    senha: '',
    telefone: '',
    Numero: 0,
    Agencia: 0,
    Saldo: 0
};
  sucesso: boolean = false;
  mensagemErro: string = '';
  chavePix: string ='';
  constructor(private fb: FormBuilder, 
    private authService: AuthenticationService,
    private bancoService: BancoService) {
    this.pixForm = this.fb.group({
      keyType: [''],
      keyValue: [''] // Adicionado keyValue ao formulário
    });
  }
  
  ngOnInit(): void {
    
  }

  onSubmit() {
    this.idUsuario = this.authService.getUsuarioAutenticado();
    console.log('idUsuario: ' + this.idUsuario);
    const tipoPix = this.pixForm.get('keyType')?.value;

    if (tipoPix == 4) {
      this.chavePix = gerarChaveAleatoria();
      if (this.chavePix !== '') {
        //this.verificarChavePixExistenteETomaDecisao(this.chavePix, tipoPix)
        this.adicionarChavePix(this.chavePix, tipoPix);
      }
    } else {
      if (this.idUsuario !== '') {
        this.bancoService.getContaPessoa(this.idUsuario).subscribe((resposta: any) => {
            const chave = Object.keys(resposta)[0]; 
            this.contaPessoa = resposta[chave]; 
            console.log('contaPessoa', this.contaPessoa);
            if (tipoPix === '1') {
              this.chavePix = this.contaPessoa.CPF;
            } else if (tipoPix === '2') {
              this.chavePix = this.contaPessoa!.telefone;
            } else {
              this.chavePix = this.contaPessoa!.email;
            }  
            if (this.chavePix !== '') {
              this.adicionarChavePix(this.chavePix, tipoPix);
            }
        });  

      }
    }
  }
  adicionarChavePix(chavePix: string, tipoPix: string) {
      this.bancoService.cadastrarChavePix(this.idUsuario, chavePix, tipoPix)
        .subscribe(
          () => {
            console.log('Chave PIX cadastrada com sucesso!');
            this.sucesso = true;
          },
          error => {
            console.error('Erro ao cadastrar chave PIX:', error);
            this.sucesso = false;
            this.mensagemErro = 'Erro ao cadastrar chave PIX:';
          }
        );
  }
  // verificarChavePixExistenteETomaDecisao(chavePix: string, tipoPix: string) {
  //   this.bancoService.getTodasChavesPix(this.idUsuario).subscribe(
  //     (chaves: Pix[]) => {
  //       if (chaves && chaves.length > 0) {
  //         const pixExistente = chaves.find(pix => pix.IdTipoPix === tipoPix);
  //         console.log('pixExistente ' + pixExistente);
  //         if (pixExistente) {
  //           console.log(`Chave PIX do tipo ${tipoPix} já existe.`);
  //           this.sucesso = false;
  //           this.mensagemErro = `Chave PIX do tipo ${tipoPix} já existe.`;
  //         } else {
  //           console.log(`Chave PIX do tipo ${tipoPix} não existe. Cadastrando...`);
  //           this.sucesso = false;
  //           this.mensagemErro = `Chave PIX do tipo ${tipoPix} não existe. Cadastrando...`;
  //           // Se a chave não existe, cadastra
  //           this.adicionarChavePix(chavePix, tipoPix);
  //         }
  //       } else {
  //         console.log('Nenhuma chave PIX cadastrada.');
  //         this.adicionarChavePix(chavePix, tipoPix);
  //       }
  //     },
  //     error => {
  //       console.error('Erro ao obter todas as chaves PIX:', error);
  //       this.sucesso = false;
  //       this.mensagemErro = 'Erro ao obter todas as chaves PIX';
  //       // Trate o erro adequadamente, talvez exibindo uma mensagem de erro para o usuário.
  //     }
  //   );
  // }
  
  
  
  
}

function gerarChaveAleatoria(): string {
  const caracteres = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let chave = '';
  for (let i = 0; i < 32; i++) {
    chave += caracteres.charAt(Math.floor(Math.random() * caracteres.length));
  }
  return chave;
}
