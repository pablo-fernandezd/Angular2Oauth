import {Component, Input, OnInit} from '@angular/core';
import {PartidoService} from '../_services/Partido/partido.service';
import {DomSanitizer} from '@angular/platform-browser';
import {MarcadorService} from '../_services/marcador/marcador.service';
import {PartidoDTO} from '../DTO/partido.dto';
import Swal from 'sweetalert2';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';

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
  nuevoPartido: any;
  nuevoEquipo: any = {}; // Asegúrate de tener un objeto para almacenar la información del nuevo equipo

  private pattern: string;

  // Agrega el servicio del modal
  private partidos: string;
  public content: any;
  constructor(private sanitizer: DomSanitizer, private marcadorService: MarcadorService,
              private partidoService: PartidoService, private modalService: NgbModal) { }

  ngOnInit(): void {
    this.getPartidos();
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
  crearPartido(partido: PartidoDTO): void {
    partido.federacionNombre = this.federacion;
    this.partidoService.crearOActualizarPartido(partido).subscribe(
      data => {
        Swal.fire('Éxito', 'Partido creado correctamente', 'success');
      },
      err => {
        Swal.fire('Error', 'No se pudo crear el partido', 'error');
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
  abrirModalDeEdicionPartido(modal: any, partido: Object) {
    // Clonar el objeto del equipo seleccionado para evitar modificar el original
    const partidoEditado = { ...partido };

    // Abrir el modal de creación de equipo con los datos del equipo seleccionado
    const modalRef = this.modalService.open(modal);
    this.nuevoPartido = partido;
    modalRef.componentInstance.nuevoPartido = this.nuevoPartido;
    modalRef.componentInstance.id = this.nuevoPartido.id; // Agregar una bandera para indicar que es una edición
  }
}
