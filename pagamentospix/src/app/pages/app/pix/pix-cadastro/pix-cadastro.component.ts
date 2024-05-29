import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { BancoService } from '../../../../services/banco.service';
import { AuthenticationService } from '../../../../services/auth/authentication.service';
import { ContaPessoa } from '../../../../models/ContaPessoa';

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
  contaPessoa?: ContaPessoa;

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
    let chavePix: string = '';

    if (tipoPix == 4) {
      chavePix = gerarChaveAleatoria();
      if (chavePix !== '') {
        this.bancoService.cadastrarChavePix(this.idUsuario, chavePix, tipoPix)
          .subscribe(
            () => {
              console.log('Chave PIX cadastrada com sucesso!');
              // Lógica adicional após o sucesso do cadastro
            },
            error => {
              console.error('Erro ao cadastrar chave PIX:', error);
              // Lógica para lidar com o erro
            }
          );
      }
    } else {
      if (this.idUsuario !== '') {
        this.bancoService.getContaPessoa(this.idUsuario).subscribe((resposta: any) => {
          if (resposta) {
            const chave = Object.keys(resposta)[0]; 
            this.contaPessoa = resposta[chave]; 
            console.log('contaPessoa', this.contaPessoa);
            switch(tipoPix){
              case '1':
                chavePix = this.contaPessoa!.CPF;
                break;
              case '2':
                chavePix = this.contaPessoa!.telefone;
                break;
              default:
                chavePix = this.contaPessoa!.email;
            }
            console.log(chavePix); // Movido para dentro do escopo do switch
            if (chavePix !== '') {
              this.bancoService.cadastrarChavePix(this.idUsuario, chavePix, tipoPix)
                .subscribe(
                  () => {
                    console.log('Chave PIX cadastrada com sucesso!');
                    // Lógica adicional após o sucesso do cadastro
                  },
                  error => {
                    console.error('Erro ao cadastrar chave PIX:', error);
                    // Lógica para lidar com o erro
                  }
                );
            }
          }
        });      
      }
    }
  }
}

function gerarChaveAleatoria(): string {
  const caracteres = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let chave = '';
  for (let i = 0; i < 32; i++) {
    chave += caracteres.charAt(Math.floor(Math.random() * caracteres.length));
  }
  return chave;
}
