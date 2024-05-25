import { Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { LoginComponent } from '../pages/autentication/login/login.component';
import { CadastroComponent } from '../pages/autentication/cadastro/cadastro.component';
import { PixComponent } from '../pages/app/pix/pix.component';
import { TransferenciaComponent } from '../pages/app/transferencia/transferencia.component';
import { PixCadastroComponent } from '../pages/app/pix-cadastro/pix-cadastro.component';
import { ExtratoComponent } from '../pages/app/extrato/extrato.component';
import { VisualizarChavePixComponent } from '../pages/app/visualizar-chave-pix/visualizar-chave-pix.component';
import { PerfilComponent } from '../pages/perfil/perfil.component';

export const routes: Routes = [
    {
        path: '', redirectTo: 'login', pathMatch: 'full',
    },
    {
        path: 'login', component: LoginComponent,
    },
    {
        path: 'cadastro', component: CadastroComponent,
    },
    {
        path: 'app', component: AppComponent, children: [
            {
                path: 'pix', component: PixComponent, children: [
                    {
                        path: 'transferência', component: TransferenciaComponent,
                    },
                    {
                        path: 'cadastro', component: PixCadastroComponent,
                    },
                    {
                        path: 'extrato', component: ExtratoComponent,
                    },
                    {
                        path: 'visualizar', component: VisualizarChavePixComponent,
                    }
                ]
            },
            {
                path: 'perfil', component: PerfilComponent,
            }
        ]
    }
];

