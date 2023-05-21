import {Component, OnInit} from '@angular/core';
import {AuthService} from '../_services/auth.service';
import {UserService} from '../_services/user.service';
import {TokenStorageService} from '../_services/token-storage.service';
import {ActivatedRoute} from '@angular/router';
import {AppConstants} from '../common/app.constants';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  form: any = {};
  isLoggedIn = false;
  isLoginFailed = false;
  errorMessage = '';
  currentUser: any;
  googleURL = AppConstants.GOOGLE_AUTH_URL;
  facebookURL = AppConstants.FACEBOOK_AUTH_URL;
  githubURL = AppConstants.GITHUB_AUTH_URL;
  linkedinURL = AppConstants.LINKEDIN_AUTH_URL;
  formReg: any = {};
  cambioContraseña = true;

  constructor(private authService: AuthService, private tokenStorage: TokenStorageService, private route: ActivatedRoute, private userService: UserService) {}

ngOnInit(): void {
this.isLoggedIn = false;
const token: string = this.route.snapshot.queryParamMap.get('token');
const error: string = this.route.snapshot.queryParamMap.get('error');
if (this.tokenStorage.getToken()) {
  console.log("logeado");
    this.isLoggedIn = true;
    this.currentUser = this.tokenStorage.getUser();
  }
  else if (token){
  console.log("token");

  this.tokenStorage.saveToken(token);
    this.userService.getCurrentUser().subscribe(
          data => {
            this.login(data);
          },
          err => {
            this.errorMessage = err.error.message;
            this.isLoginFailed = true;
          }
      );
  }
  else if (error){
    this.errorMessage = error;
    this.isLoginFailed = true;
  }
  if(this.isLoggedIn && this.currentUser.isEnable){
    window.location.href = '/home';
  }
  else if (this.isLoggedIn && !this.currentUser.isEnable){
    this.cambioContraseña = false;
    this.formReg.nombre = this.currentUser.nombre;
    this.formReg.apellido1 = this.currentUser.apellido1;
    this.formReg.apellido2 = this.currentUser.apellido2;
    this.formReg.email = this.currentUser.email;
  }
}

  onSubmit(): void {
    this.authService.login(this.form).subscribe(
      data => {
        this.tokenStorage.saveToken(data.accessToken);
        this.login(data.user);
      },
      err => {
        this.errorMessage = err.error.message;
        this.isLoginFailed = true;
      }
    );
  }

  login(user): void {
    this.tokenStorage.saveUser(user);
    this.isLoginFailed = false;
    this.isLoggedIn = true;
    this.currentUser = this.tokenStorage.getUser();
    if (this.currentUser.isEnable == true){
    window.location.href = '/home';
  }else{
      window.location.reload();
    }
  }

  onSubmit2(): void {
    this.formReg.email = this.currentUser.email;
    this.authService.update(this.formReg).subscribe(
      data => {
        this.tokenStorage.saveToken(data.accessToken);
        this.cambioContraseña = true;
        this.currentUser.isEnable = true;
        this.login(this.currentUser);
        window.location.href = '/home';

      },
      err => {
        this.errorMessage = err.error.message;
        this.isLoginFailed = true;
      }
    );  }
}
