import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {RegisterComponent} from './register/register.component';
import {LoginComponent} from './login/login.component';
import {ResetPasswordComponent} from './resetPassword/resetPassword.component';
import {HomeComponent} from './home/home.component';
import {ProfileComponent} from './profile/profile.component';
import {BoardUserComponent} from './board-user/board-user.component';
import {BoardModeratorComponent} from './board-moderator/board-moderator.component';
import {BoardAdminComponent} from './board-admin/board-admin.component';
import { CreacionContraseña } from './login/creacionContraseña.guard';
import {ScoreBoardComponent} from './score-board/score-board.component';
import {FederacionesComponent} from './federaciones/federaciones.component';


const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'login', component: LoginComponent, canDeactivate: [CreacionContraseña]},
  { path: 'resetpassword/:token', component: ResetPasswordComponent, canDeactivate: [CreacionContraseña]},
  { path: 'resetpassword', component: ResetPasswordComponent, canDeactivate: [CreacionContraseña]},
  { path: 'register', component: RegisterComponent },
  { path: 'profile', component: ProfileComponent },
  { path: 'user', component: BoardUserComponent },
  { path: 'mod', component: BoardModeratorComponent },
  { path: 'admin', component: BoardAdminComponent },
  { path: 'federacion/:federacion', component: FederacionesComponent},
  { path: 'marcadorOnline/:idPartido', component: ScoreBoardComponent },
  { path: '', redirectTo: 'home', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' })],
  exports: [RouterModule],
  providers: [CreacionContraseña]
})
export class AppRoutingModule { }
