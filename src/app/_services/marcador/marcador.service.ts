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

  setPuntoLocal(id: number, puntos: number): Observable<any> {
    return this.http.put<any>(`${this.url}${id}/setpuntolocal`, puntos);
  }

  setPuntoVisitante(id: number, puntos: number): Observable<any> {
    return this.http.put<any>(`${this.url}${id}/setpuntovisitante`, puntos);
  }

  getPartidoById(id: number): Observable<any> {
    return this.http.get<any>(`${this.url}${id}`);
  }
  getPartidosByUserId(id: number): Observable<any> {
    return this.http.get<any>(`${this.url}arbitro/${id}`);
  }
getPartidosByFederacionId(id: string): Observable<any> {
    return this.http.get<any>(`${this.url}federacion/${id}`);
  }

}
