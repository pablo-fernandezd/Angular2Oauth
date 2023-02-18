import { Injectable } from '@angular/core';
import { CanDeactivate } from '@angular/router';
import { LoginComponent } from './login.component';

@Injectable()
export class CreacionContraseña implements CanDeactivate<LoginComponent> {
  // tslint:disable-next-line:typedef
  canDeactivate(component: LoginComponent) {
    if (!component.cambioContraseña) {
      return confirm('¿Está seguro que desea abandonar el formulario de registro?');
    }
    return true;
  }
}
