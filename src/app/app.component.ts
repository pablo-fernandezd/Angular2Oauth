import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {TokenStorageService} from './_services/token-storage.service';
import {FederacionService} from './_services/Federacion/federacion.service';
import {ActivatedRoute, NavigationEnd, NavigationStart, Router} from '@angular/router';
import {filter} from 'rxjs/operators';


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
  isRutaEspecialFlag: boolean;
  federacion: string;
  secciones: any;
  seccionesFiltradas: any;







  constructor(private cdr: ChangeDetectorRef, private tokenStorageService: TokenStorageService, private rutaActiva: ActivatedRoute, private federacionService: FederacionService, private router: Router) {this.router.events.pipe(
    filter(event => event instanceof NavigationStart)
  ).subscribe(async (event: NavigationEnd) => {
    await this.delay(0); // Esperar 0 ms para permitir que Angular procese los cambios
    this.isRutaEspecial(event.url);
    this.filtrarSecciones('Noticias');
  }); }

  ngOnInit(): void {
    this.cdr.detectChanges();
    const rutaActual = this.rutaActiva.snapshot.url.join('/'); // La ruta como string

    this.isRutaEspecial(rutaActual);
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
  this.isRutaEspecialFlag = url.includes("/federacion");
  if (url.includes("/federacion")){
    const partes = url.split("/"); // Divide la cadena en partes usando "/"
    const nombreFederacion = partes[2];
    this.federacion=nombreFederacion;
    this.cogerSecciones(nombreFederacion);
  }
}
  private delay(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
  cogerSecciones(nombreFederacion){
      this.federacionService.getByName(nombreFederacion)
        .subscribe(
          data => {
            this.secciones = data[0].secciones;
          },
          err => {
            this.secciones = JSON.parse(err.error).message;
          }
        );
  }
  toggleNavbarCollapsed() {
    this.navbarCollapsed = !this.navbarCollapsed;
  }
  logout(): void {
    this.tokenStorageService.signOut();
    window.location.reload();
  }

  filtrarSecciones(nombreSeccion: string) {
    // Lógica para filtrar secciones según el nombre de la federación
    if (nombreSeccion) {
      this.seccionesFiltradas = this.secciones.filter(seccion => seccion.nombreLargo === nombreSeccion);
    }
  }
}
