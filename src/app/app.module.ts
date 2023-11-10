import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {FormsModule} from '@angular/forms';
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
import {BoardModeratorComponent} from './board-moderator/board-moderator.component';
import {BoardUserComponent} from './board-user/board-user.component';
import { CreacionContraseña } from './login/creacionContraseña.guard';

import bootstrap from 'bootstrap';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap'; // Importa NgbModule



import {authInterceptorProviders} from './_helpers/auth.interceptor';
import { ScoreBoardComponent } from './score-board/score-board.component';
import {FederacionesComponent} from './federaciones/federaciones.component';
import {NavigationStart, Router} from '@angular/router';

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
    BoardModeratorComponent,
    BoardUserComponent,
    ScoreBoardComponent,
    FederacionesComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
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
    BoardModeratorComponent,
    BoardUserComponent,
    FederacionesComponent
  ]
})
export class AppModule {
  constructor(private router: Router) {
    // Filtramos las rutas y actualizamos la condición cuando la ruta cambia
    this.router.events.pipe(
      filter(event => event instanceof NavigationStart)
    ).subscribe((event: NavigationStart) => {
      this.isRutaEspecial(event.url);
    });
  }
  isRutaEspecial(url: string) {
return url.includes("/federaciones")
  }
}
