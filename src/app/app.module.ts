import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import { filter } from 'rxjs/operators';

import {AppComponent} from './app.component';
import {LoginComponent} from './login/login.component';
import {ResetPasswordComponent} from './resetPassword/resetPassword.component';
import {RegisterComponent} from './register/register.component';
import {HomeComponent} from './home/home.component';
import {ProfileComponent} from './profile/profile.component';
import {BoardAdminComponent} from './board-admin/board-admin.component';
import {BoardArbitroComponent} from './board-arbitro/board-arbitro.component';
import {BoardUserComponent} from './board-user/board-user.component';
import { CreacionContraseña } from './login/creacionContraseña.guard';

import bootstrap from 'bootstrap';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap'; // Importa NgbModule



import {authInterceptorProviders} from './_helpers/auth.interceptor';
import { ScoreBoardComponent } from './score-board/score-board.component';
import {FederacionesComponent} from './federaciones/federaciones.component';
import {NavigationStart, Router} from '@angular/router';
import {PartidosComponent} from './partidos/partidos.component';
import {UsuariosComponent} from './usuaros/usuarios.component';
import {EquiposComponent} from './equipos/equipos.component';
import {SeccionesComponent} from './secciones/secciones.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    ResetPasswordComponent,
    RegisterComponent,
    HomeComponent,
    ProfileComponent,
    BoardAdminComponent,
    BoardArbitroComponent,
    BoardUserComponent,
    ScoreBoardComponent,
    FederacionesComponent,
    PartidosComponent,
    UsuariosComponent,
    EquiposComponent,
    SeccionesComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    AppRoutingModule,
    NgbModule,
    FormsModule,
    NgbModule,
    HttpClientModule
  ],
  providers: [authInterceptorProviders, CreacionContraseña],
  bootstrap: [AppComponent],
  exports: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    ProfileComponent,
    BoardAdminComponent,
    BoardUserComponent,
    FederacionesComponent
  ]
})
export class AppModule {
}
