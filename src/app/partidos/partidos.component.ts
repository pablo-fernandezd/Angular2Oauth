import {Component, Input, OnInit} from '@angular/core';
import {PartidoService} from '../_services/Partido/partido.service';
import {DomSanitizer} from '@angular/platform-browser';
import {MarcadorService} from '../_services/marcador/marcador.service';
import {PartidoDTO} from '../DTO/partido.dto';
import Swal from 'sweetalert2';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {EquipoService} from '../_services/Equipo/equipo.service';

@Component({
  selector: 'app-partidos',
  templateUrl: './partidos.component.html',
  styleUrls: ['./partidos.component.css']
})
export class PartidosComponent implements OnInit {
  @Input() federacion: string;
  users: any[] = [];
  filteredUsers: any[] = [];
  searchText: string;
  nuevoPartido: any = {};
  arbitros: any[] = [];

  nuevoEquipo: any = {}; // Asegúrate de tener un objeto para almacenar la información del nuevo equipo

  private pattern: string;

  // Agrega el servicio del modal
  private partidos: string;
  public content: any;
  public equipos: any;
  constructor(private sanitizer: DomSanitizer, private marcadorService: MarcadorService,
              private partidoService: PartidoService, private modalService: NgbModal,
              private equipoService: EquipoService) { }

  ngOnInit(): void {
    this.getPartidos();
    this.getEquipos();
    this.getArbitros();
  }

  private getPartidos() {
    this.marcadorService.getPartidosByFederacionId(this.federacion).subscribe(
      data => {
        this.content = data;
        this.partidos = this.content;
        console.log(this.content);
      },
      err => {
        this.content = JSON.parse(err.error).message;
      }
    );
  }
  private getArbitros() {
    this.marcadorService.getArbitros(this.federacion).subscribe(
      data => {
        this.arbitros = data;
        console.log(this.content);
      },
      err => {
        this.content = JSON.parse(err.error).message;
      }
    );
  }
  agregarArbitro() {
    if (!this.nuevoPartido.arbitroPartidoDTO){
      this.nuevoPartido.arbitroPartidoDTO = [];
    }
    this.nuevoPartido.arbitroPartidoDTO.push({ tipoArbitro: null, arbitro_id: null });
  }
  filtrarPorEstado(param: number | null) {
    if (param == null){
      this.partidos = this.content;
    }else{
      this.partidos = this.content.filter(partido => partido.estado === param);
    }
  }
  getImgSrc(imagen) {
    // Sanitiza la URL para evitar problemas de seguridad
    const sanitizedImage = this.sanitizer.bypassSecurityTrustUrl(`data:image;base64,${imagen}`);

    return sanitizedImage;
  }
  abrirModalDeCreacion(content): void {
    this.modalService.open(content, {centered: true});
  }
  crearPartido(partido: any): void {
    if (partido.arbitroPartidoDTO != null && partido.arbitroPartidoDTO.length > 0) {
      for (const arbitroPartidoDTO of partido.arbitroPartidoDTO) {
        arbitroPartidoDTO.arbitro_id = Number(arbitroPartidoDTO.arbitro_id);
      }
    }
    partido.federacionNombre = this.federacion;
    if (!isNaN(Number(partido.equipoVisitante))){
      partido.equipoVisitante_Id = Number(partido.equipoVisitante);
      partido.equipoVisitante=null;
    }else{
      partido.equipoVisitante_Id=null;
      partido.equipoVisitanteText = partido.equipoVisitante;
      partido.equipoVisitante=null;
    }
    if (!isNaN(Number(partido.equipoLocal))){
      partido.equipoLocal_id = Number(partido.equipoLocal);
      partido.equipoVisitanteRelacionadoPartido=null;
      partido.equipoLocal=null;
    }else {
      partido.equipoLocalText = partido.equipoLocal;
      partido.equipoLocal=null;
      partido.equipoLocal_id=null;
    }
    if (partido.crearStream==null){
      partido.crearStream=false;
    }
    this.partidoService.crearOActualizarPartido(partido).subscribe(
      data => {
        this.getPartidos();
        Swal.fire('Éxito', 'Partido creado correctamente', 'success');
      },
      err => {
        Swal.fire('Error', 'No se pudo crear el partido', 'error');
      }
    );
  }
  getEquipos() {
    this.equipoService.getByPattern(this.federacion, null).subscribe(
      data => {
        this.equipos = data;
      },
      err => {
        this.content = JSON.parse(err.error).message;
      }
    );
  }
  confirmarEliminarUsuario(id) {
    // Utiliza swal para mostrar el mensaje de confirmación
    Swal.fire({
      title: '¿Estás seguro?',
      text: 'Esta acción no se puede deshacer',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Sí, eliminar'
    }).then((result) => {
      // Si el usuario hace clic en "Sí, eliminar", entonces ejecuta la función eliminarUsuario
      if (result.isConfirmed) {
        this.partidoService.eliminarEquipo(id).subscribe(
          data => {
            this.getPartidos();
            Swal.fire('Éxito', 'Partido eliminado correctamente', 'success');
          },
          err => {
            Swal.fire('Error', 'No se pudo eliminar el usuario', 'error');
          }
        );
      }
    });
  }
  abrirModalDeEdicionPartido(modal: any, partido: any) {
    partido.equipoLocal=partido.equipoLocalText;
    partido.equipoVisitante=partido.equipoVisitanteText;

    // Clonar el objeto del equipo seleccionado para evitar modificar el original
    const partidoEditado = { ...partido };
    // Abrir el modal de creación de equipo con los datos del equipo seleccionado
    const modalRef = this.modalService.open(modal);
    this.nuevoPartido = partidoEditado;
    modalRef.componentInstance.nuevoPartido = this.nuevoPartido;
    modalRef.componentInstance.id = this.nuevoPartido.id; // Agregar una bandera para indicar que es una edición
  }
}
