import { Injectable } from '@angular/core';
import { CanDeactivate } from '@angular/router';
import { ResetPasswordComponent } from './resetPassword.component';

@Injectable()
export class CreacionContraseña implements CanDeactivate<ResetPasswordComponent> {
  // tslint:disable-next-line:typedef
  canDeactivate(component: ResetPasswordComponent) {
    if (!component.cambioContraseña) {
      return confirm('¿Está seguro que desea abandonar el formulario de registro?');
    }
    return true;
  }
}
