import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {AppConstants} from '../../common/app.constants';
import { map } from 'rxjs/operators';
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};


@Injectable({
  providedIn: 'root'
})
export class FederacionService {

  constructor(private http: HttpClient) {
  }

  getByName(name: string): Observable<any> {
    return this.getAll().pipe(
      map(federaciones => federaciones.filter(federacion => federacion.nombre === name))
    );
  }
  getAll(): Observable<any> {
    return this.http.get(AppConstants.API_URL + 'federaciones/', {responseType: 'json'});
  }
  createFederacion(federacion): Observable<any> {
    return this.http.post(AppConstants.API_URL + 'federaciones/', {
      nombre: federacion.nombre,
      nombreLargo: federacion.nombreLargo
    }, httpOptions);
  }
}
