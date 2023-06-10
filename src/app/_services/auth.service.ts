import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {AppConstants} from '../common/app.constants';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private http: HttpClient) { }

  login(credentials): Observable<any> {
    return this.http.post(AppConstants.AUTH_API + 'signin', {
      email: credentials.username,
      password: credentials.password
    }, httpOptions);
  }

  register(user): Observable<any> {
    return this.http.post(AppConstants.AUTH_API + 'signup', {
      nombre: user.nombre,
      apellido1: user.apellido1,
      apellido2: user.apellido2,      email: user.email,
      password: user.password,
      matchingPassword: user.matchingPassword,
      socialProvider: 'LOCAL'
    }, httpOptions);
  }
  update(user): Observable<any> {
    return this.http.post(AppConstants.AUTH_API + 'setpassword', {
      nombre: user.nombre,
      apellido1: user.apellido1,
      apellido2: user.apellido2,
      email: user.email,
      password: user.password,
      matchingPassword: user.matchingPassword,
      socialProvider: 'LOCAL'
    }, httpOptions);
  }
  resetPasswordSendMail(email: string): Observable<any>  {
    const params = { email };
    return this.http.post(AppConstants.AUTH_API + 'resetPassword', null, { params });
  }resetNewPassword(password: string, token: string): Observable<any>  {
    const params = { password, token };
    return this.http.post(AppConstants.AUTH_API + 'updatePassword', null, { params });
  }
}
