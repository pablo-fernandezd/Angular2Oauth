import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {FederacionService} from '../_services/Federacion/federacion.service';
import {MarcadorService} from '../_services/marcador/marcador.service';
import {DomSanitizer} from '@angular/platform-browser';

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
  private partidos: any;
  private partidosFiltrados: any;
  seccionNombre: string;

  constructor(private sanitizer: DomSanitizer, private marcadorService: MarcadorService, private rutaActiva: ActivatedRoute, private federacionService: FederacionService) { }

  ngOnInit(): void {
    this.federacionService.getByName(this.rutaActiva.snapshot.params.federacion)
      .subscribe(
      data => {
        this.secciones = data[0].secciones;
        if (this.rutaActiva.snapshot.params.seccion==null){
        this.filtrarSecciones("Noticias");
        }
        else{
          this.seccionNombre = this.rutaActiva.snapshot.params.seccion;
          this.filtrarSecciones(this.rutaActiva.snapshot.params.seccion);
        }
        this.nombreLargo = data[0].nombreLargo;
      },
      err => {
        this.content = JSON.parse(err.error).message;
      }
    );

    this.marcadorService.getPartidosByFederacionId(this.rutaActiva.snapshot.params.federacion).subscribe(
      data => {
        this.partidos = data;
        this.partidosFiltrados = this.partidos;
      },
      err => {
        this.content = JSON.parse(err.error).message;
      }
    );
  }
  filtrarSecciones(nombreSeccion: string) {
    // Lógica para filtrar secciones según el nombre de la federación
    if (nombreSeccion && this.secciones && this.secciones.length>0) {

      this.seccionesFiltradas = this.secciones.filter(seccion => seccion.nombreLargo === nombreSeccion)[0];
      this.entradas = this.seccionesFiltradas.entradas;
    }
  }
  filtrarPorEstado(param: number | null) {
    if (param == null){
      this.partidosFiltrados = this.partidos;
    }else{
      this.partidosFiltrados = this.partidos.filter(partido => partido.estado === param);
    }
  }
  getImgSrc(imagen) {
    // Sanitiza la URL para evitar problemas de seguridad
    const sanitizedImage = this.sanitizer.bypassSecurityTrustUrl(`data:image;base64,${imagen}`);

    return sanitizedImage;
  }

}
