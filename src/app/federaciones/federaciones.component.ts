import {Component, OnInit} from '@angular/core';
import {UserService} from '../_services/user.service';
import {ActivatedRoute} from '@angular/router';
import {FederacionService} from '../_services/Federacion/federacion.service';

@Component({
  selector: 'app-federaciones',
  templateUrl: './federaciones.component.html',
  styleUrls: ['./federaciones.component.css']
})
export class FederacionesComponent implements OnInit {

  content: any;
  secciones: any;
  seccionesFiltradas: any;
  entradas: any;
  nombreLargo: string;

  constructor(private rutaActiva: ActivatedRoute, private federacionService: FederacionService) { }

  ngOnInit(): void {
    this.federacionService.getByName(this.rutaActiva.snapshot.params.federacion)
      .subscribe(
      data => {
        this.secciones = data[0].secciones;
        this.filtrarSecciones("Noticias");
        this.nombreLargo = data[0].nombreLargo;
      },
      err => {
        this.content = JSON.parse(err.error).message;
      }
    );
  }
  filtrarSecciones(nombreSeccion: string) {
    // Lógica para filtrar secciones según el nombre de la federación
    if (nombreSeccion) {
      this.seccionesFiltradas = this.secciones.filter(seccion => seccion.nombreLargo === nombreSeccion)[0];
      this.entradas = this.seccionesFiltradas.entradas;
    }
  }

}
