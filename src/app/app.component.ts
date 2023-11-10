import {Component, OnInit} from '@angular/core';
import {TokenStorageService} from './_services/token-storage.service';
import {FederacionService} from './_services/Federacion/federacion.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  private roles: string[];
  isLoggedIn = false;
  showAdminBoard = false;
  showModeratorBoard = false;
  showArbitroBoard = false;
  username: string;
  federaciones: any;
  navbarCollapsed = false;






  constructor(private tokenStorageService: TokenStorageService,private federacionService: FederacionService) { }
// Filtramos las rutas y actualizamos la condición cuando la ruta cambia
  this.router.events.pipe(
    filter(event => event instanceof NavigationStart)
).subscribe((event: NavigationStart) => {
  this.isRutaEspecial(event.url);
});
  ngOnInit(): void {

    this.isLoggedIn = !!this.tokenStorageService.getToken();
    this.federacionService.getAll().subscribe(
      data => {
        this.federaciones = data;
      },
      err => {
        console.log(err);
      }
    );

    if (this.isLoggedIn) {
      const user = this.tokenStorageService.getUser();
      this.roles = user.roles;

      this.showAdminBoard = this.roles.includes('ROLE_ADMIN');
      this.showArbitroBoard = this.roles.includes('ROLE_ARBITRO');
      this.showModeratorBoard = this.roles.includes('ROLE_MODERATOR');

      this.username = user.displayName;
    }
  }
isRutaEspecial(url: string) {
  return url.includes("/federaciones")
}
  toggleNavbarCollapsed() {
    this.navbarCollapsed = !this.navbarCollapsed;
  }
  logout(): void {
    this.tokenStorageService.signOut();
    window.location.reload();
  }
}
