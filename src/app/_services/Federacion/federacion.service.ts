import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {AppConstants} from '../../common/app.constants';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};


@Injectable({
  providedIn: 'root'
})
export class FederacionService {

  constructor(private http: HttpClient) {
  }

  getAll(): Observable<any> {
    return this.http.get(AppConstants.API_URL + 'federaciones', {responseType: 'json'});
  }

  createFederacion(federacion): Observable<any> {
    return this.http.post(AppConstants.API_URL + 'federacion', {
      nombre: federacion.nombre,
      nombreLargo: federacion.nombreLargo
    }, httpOptions);
  }
}
