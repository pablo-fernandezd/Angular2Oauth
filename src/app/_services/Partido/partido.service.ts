import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {PartidoDTO} from '../../DTO/partido.dto';
import {AppConstants} from '../../common/app.constants';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};


@Injectable({
  providedIn: 'root'
})
export class PartidoService {
  url = AppConstants.API_URL + 'partidos/';

  constructor(private http: HttpClient) { }

  crearOActualizarPartido(partido: PartidoDTO): Observable<any> {
    return this.http.post(`${this.url}/create`, partido);
  }

  eliminarEquipo(id) {
      const url = `${AppConstants.API_URL}partidos/delete?partidoId=${id}`;
      return this.http.delete(url);
  }
}
