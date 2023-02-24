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
export class MarcadorService {

  constructor(private http: HttpClient) {
  }
  url = AppConstants.API_URL + 'partidos/';


  finalizarPartido(id: number): Observable<any> {
    return this.http.put<any>(`${this.url}${id}/finalizar`, null);
  }

  desFinalizarPartido(id: number): Observable<any> {
    return this.http.put<any>(`${this.url}${id}/desfinalizar`, null);
  }

  finalizarSet(id: number): Observable<any> {
    return this.http.put<any>(`${this.url}${id}/finalizarset`, null);
  }

  desFinalizarSet(id: number): Observable<any> {
    return this.http.put<any>(`${this.url}${id}/desfinalizarset`, null);
  }

  sumarPuntoLocal(id: number): Observable<any> {
    return this.http.put<any>(`${this.url}${id}/sumarpuntolocal`, null);
  }

  sumarPuntoVisitante(id: number): Observable<any> {
    return this.http.put<any>(`${this.url}${id}/sumarpuntovisitante`, null);
  }

  restarPuntoLocal(id: number): Observable<any> {
    return this.http.put<any>(`${this.url}${id}/restarpuntolocal`, null);
  }

  restarPuntoVisitante(id: number): Observable<any> {
    return this.http.put<any>(`${this.url}${id}/restarpuntovisitante`, null);
  }
  getPartidoById(id: number): Observable<any> {
    return this.http.get<any>(`${this.url}${id}`);
  }
}
