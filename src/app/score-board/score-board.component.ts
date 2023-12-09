import {Component, OnInit} from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';

import {MarcadorService} from '../_services/marcador/marcador.service';
import {DomSanitizer} from '@angular/platform-browser';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-volleyball-scoreboard',
  templateUrl: './score-board.component.html',
  styleUrls: ['./score-board.component.css']
})
export class ScoreBoardComponent {
  public partido: any;
  constructor(private sanitizer: DomSanitizer,private rutaActiva: ActivatedRoute, private marcadorService: MarcadorService) {
  }

  ngOnInit(): void {
    this.marcadorService.getPartidoById(this.rutaActiva.snapshot.params.idPartido).subscribe(
      data => {
        this.partido = data;
      },
      err => {
        console.log(err);
      }
    );
  }
  setsParseado:any;

  // Métodos para manejar la lógica del marcador de voleibol
  swapColumns: boolean;

  switchEquipos() {
    this.swapColumns = !this.swapColumns;
  }

  finalizarPartido(){
    this.marcadorService.finalizarPartido(this.rutaActiva.snapshot.params.idPartido).subscribe(
      data => {
        this.partido = data;
      },
      err => {
        console.log(err);
      }
    );  }

  finalizarSet() {
    this.marcadorService.finalizarSet(this.rutaActiva.snapshot.params.idPartido).subscribe(
      data => {
        this.partido = data;
      },
      err => {
        Swal.fire('Error', err.error.message, 'error');
      }
    );  }

  desFinalizarPartido(){
    this.marcadorService.desFinalizarPartido(this.rutaActiva.snapshot.params.idPartido).subscribe(
      data => {
        this.partido = data;
      },
      err => {
        console.log(err);
      }
    );  }

  desFinalizarSet() {
    this.marcadorService.desFinalizarSet(this.rutaActiva.snapshot.params.idPartido).subscribe(
      data => {
        this.partido = data;
      },
      err => {
        console.log(err);
      }
    );  }

  restarPuntosA() {
    this.partido.marcador.puntosActualesLocal--;
    this.marcadorService.setPuntoLocal(this.partido.id,this.partido.marcador.puntosActualesLocal).subscribe(
      err => {
        console.log(err);
      }
    );
  }

  restarPuntosB() {
    this.partido.marcador.puntosActualesVisitante--;
    this.marcadorService.setPuntoVisitante(this.partido.id,this.partido.marcador.puntosActualesVisitante).subscribe(
      err => {
        console.log(err);
      }
    );
  }

  sumarPuntosA() {
    this.partido.marcador.puntosActualesLocal++;
    this.marcadorService.setPuntoLocal(this.partido.id,this.partido.marcador.puntosActualesLocal).subscribe(
      err => {
        console.log(err);
      }
    );
  }

  sumarPuntosB() {
    this.partido.marcador.puntosActualesVisitante++;
    this.marcadorService.setPuntoVisitante(this.partido.id,this.partido.marcador.puntosActualesVisitante).subscribe(
      err => {
        console.log(err);
      }
    );
  }

  getImgSrc(imagen) {
    // Sanitiza la URL para evitar problemas de seguridad
    const sanitizedImage = this.sanitizer.bypassSecurityTrustUrl(`data:image;base64,${imagen}`);

    return sanitizedImage;
  }
}

