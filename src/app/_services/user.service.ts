import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {AppConstants} from '../common/app.constants';
import Swal from 'sweetalert2';

const httpOptions = {
		  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
		};


@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  getPublicContent(): Observable<any> {
    return this.http.get(AppConstants.API_URL + 'all', { responseType: 'text' });
  }

  getUserBoard(): Observable<any> {
    return this.http.get(AppConstants.API_URL + 'user', { responseType: 'text' });
  }

  getModeratorBoard(): Observable<any> {
    return this.http.get(AppConstants.API_URL + 'mod', { responseType: 'text' });
  }

  getAdminBoard(): Observable<any> {
    return this.http.get(AppConstants.API_URL + 'admin', { responseType: 'text' });
  }

  getCurrentUser(): Observable<any> {
    return this.http.get(AppConstants.API_URL + 'user/me', httpOptions);
  }
  getUsers(federacion, pattern): Observable<any> {
    return this.http.get(AppConstants.API_URL + 'arbitros/browse/'+federacion+'/'+pattern , httpOptions);
  }
  toggleArbitro(userId, federacion): Observable<any> {
    return this.http.get(AppConstants.API_URL + 'arbitros/toggleArbitro?userId='+userId+"&federacion="+federacion , httpOptions);
  }
  toggleAdmin(userId, federacion): Observable<any> {
    return this.http.get(AppConstants.API_URL + 'arbitros/toggleAdmin?userId='+userId+"&federacion="+federacion , httpOptions);
  }

  eliminarUsuario(id: number): Observable<any> {
    const url = `${AppConstants.API_URL}arbitros/deleteUser?userId=${id}`;
    return this.http.delete(url);
  }
}
