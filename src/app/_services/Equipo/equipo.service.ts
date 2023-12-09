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
export class EquipoService {

  constructor(private http: HttpClient) {
  }
  crearEquipo(equipo: any, escudo: File): Observable<any> {
    const formData: FormData = new FormData();
    formData.append('nombre', equipo.nombre);
    formData.append('abreviatura', equipo.abreviatura);
    formData.append('federacionNombre', equipo.federacionNombre);
    if (escudo) {
      formData.append('escudo', escudo);
    }
    if (equipo.id!=null)
      formData.append('id', equipo.id);
    return this.http.post(AppConstants.API_URL + 'equipos/crear', formData);
  }
  eliminarEquipo(id: number): Observable<any> {
    const url = `${AppConstants.API_URL}equipos/delete?equipoId=${id}`;
    return this.http.delete(url);
  }
  getByPattern(federacion, pattern) {
    return this. http.get(AppConstants.API_URL + 'equipos/browse/' + federacion + '/' + pattern , httpOptions);
  }
}
