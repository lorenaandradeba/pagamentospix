import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { LoginComponent } from '../pages/autentication/login/login.component';
import { CadastroComponent } from '../pages/autentication/cadastro/cadastro.component';
import { PixComponent } from '../pages/app/pix/pix.component';
import { PixCadastroComponent } from '../pages/app/pix/pix-cadastro/pix-cadastro.component';

import { VisualizarChavePixComponent } from '../pages/app/pix/visualizar-chave-pix/visualizar-chave-pix.component';
import { PerfilComponent } from '../pages/perfil/perfil.component';
import { OptionsComponent } from '../pages/autentication/auth/options/options.component';
import { NgModule } from '@angular/core';
import { ExtratoComponent } from '../pages/app/pix/extrato/extrato.component';
import { TransferenciaComponent } from '../pages/app/pix/transferencia/transferencia.component';

export const routes: Routes = [
    {
        path: '', redirectTo: 'auth', pathMatch: 'full'
    },
    {
        path: 'auth', component: OptionsComponent
    },
    {
        path: 'login', component: LoginComponent,
    },
    {
        path: 'register', component: CadastroComponent,
    },
    {
        path: 'app', component: PixComponent, children: [
            {
                path: 'extrato', component: ExtratoComponent,
            },
            {
                path: 'transferencia', component: TransferenciaComponent,
            },
            {
                path: 'pix-cadastro', component: PixCadastroComponent,
            },
            {
                path: 'visualizar-chave-pix', component: VisualizarChavePixComponent,
            },          
            {
                path: 'perfil', component: PerfilComponent,
            }
        ]
      
    }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }