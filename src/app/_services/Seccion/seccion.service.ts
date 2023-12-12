import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {AppConstants} from '../../common/app.constants';
import { map } from 'rxjs/operators';
import {any} from 'codelyzer/util/function';
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};


@Injectable({
  providedIn: 'root'
})
export class SeccionService {

  constructor(private http: HttpClient) {
  }
  crearSeccion(seccion: any): Observable<any> {
    const formData: FormData = new FormData();
    formData.append('nombre', seccion.nombreLargo);
    formData.append('federacionNombre', seccion.federacionNombre);
    if (seccion.id!=null)
      formData.append('id', seccion.id);
    return this.http.post(AppConstants.API_URL + 'seccion/crear', formData);
  }
  crearEntrada(entrada: any, escudo: File): Observable<any> {
    const formData: FormData = new FormData();
    formData.append('titulo', entrada.titulo);
    formData.append('descripcion', entrada.descripcion);
    formData.append('seccionId', entrada.seccionId);
    if (escudo) {
      formData.append('imagen', escudo);
    }
    if (entrada.id!=null)
      formData.append('id', entrada.id);
    return this.http.post(AppConstants.API_URL + 'entrada/crear', formData);
  }
  eliminarSeccion(id: number): Observable<any> {
    const url = `${AppConstants.API_URL}seccion/delete?seccionId=${id}`;
    return this.http.delete(url);
  }eliminarEntrada(id: number): Observable<any> {
    const url = `${AppConstants.API_URL}entrada/delete?entradaId=${id}`;
    return this.http.delete(url);
  }
  getByFederacion(federacion) {
    return this. http.get(AppConstants.API_URL + 'secciones/getByFederacion/' + federacion + '/', httpOptions);
  }
}
