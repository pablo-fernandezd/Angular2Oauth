import {Component, OnInit} from '@angular/core';
import {AuthService} from '../_services/auth.service';
import {TokenStorageService} from '../_services/token-storage.service';
import {AppConstants} from '../common/app.constants';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  log: any = {};
  form: any = {};
  isSuccessful = false;
  isSignUpFailed = false;
  errorMessage = '';
  googleURL = AppConstants.GOOGLE_AUTH_URL;
  facebookURL = AppConstants.FACEBOOK_AUTH_URL;
  githubURL = AppConstants.GITHUB_AUTH_URL;
  linkedinURL = AppConstants.LINKEDIN_AUTH_URL;
  private currentUser: any;

  constructor(private authService: AuthService,private tokenStorage: TokenStorageService) { }

  ngOnInit(): void {
  }

  onSubmit(): void {
    this.authService.register(this.form).subscribe(
      data => {
        console.log(data);
        this.isSuccessful = true;
        this.isSignUpFailed = false;
        this.log = {
          username: this.form.email,
          password: this.form.password
        };
        this.authService.login(this.log).subscribe(
          data2 => {
            this.tokenStorage.saveToken(data2.accessToken);
            this.login(data2.user);

          },
          err => {
            this.errorMessage = err.error.message;
          }
        );
      },
      err => {
        this.errorMessage = err.error.message;
        this.isSignUpFailed = true;
      }
    );
  }
  login(user): void {
    this.tokenStorage.saveUser(user);
    this.currentUser = this.tokenStorage.getUser();
    window.location.href = '/home';
  }

}
