import {Component, Input, OnInit} from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { UserService } from '../_services/user.service';
import {PartidoService} from '../_services/Partido/partido.service';
import Swal from 'sweetalert2';
import {EquipoService} from '../_services/Equipo/equipo.service';
import {DomSanitizer} from '@angular/platform-browser';

@Component({
  selector: 'app-equipos',
  templateUrl: './equipos.component.html',
  styleUrls: ['./equipos.component.css']
})
export class EquiposComponent implements OnInit {
  @Input() federacion: string;
  id: number = null;
  content: string;
  users: any[] = [];
  filteredUsers: any[] = [];
  searchText: string;
  nuevoPartido: any;
  nuevoEquipo: any = {}; // Asegúrate de tener un objeto para almacenar la información del nuevo equipo

  private pattern: string;

  // Agrega el servicio del modal
  public equipos: any;
  constructor(
    private sanitizer: DomSanitizer,
    private userService: UserService,
    private partidoService: PartidoService,
    private modalService: NgbModal,
    private equipoService: EquipoService
  ) {
  }

  ngOnInit(): void {
    this.getEquipos('null');
  }

  getEquipos(pattern) {
    this.equipoService.getByPattern(this.federacion, pattern).subscribe(
      data => {
        this.equipos = data;
        this.filteredUsers = this.users;
      },
      err => {
        this.content = JSON.parse(err.error).message;
      }
    );
  }

  // Filtra la lista de usuarios según el texto de búsqueda
  private escudo: File;


  abrirModalDeCreacionEquipo(content: any) {
    this.modalService.open(content, { centered: true });
  }

  onFileChange(event: any) {
    const fileList: FileList = event.target.files;
    if (fileList.length > 0) {
      this.escudo = fileList[0];
    }
  }

  crearEquipo(nuevoEquipo: any, form: any) {
    // tslint:disable-next-line:triple-equals
    if (this.escudo == undefined) {
      this.escudo = null;
    }
    if (nuevoEquipo.id == undefined)
      nuevoEquipo.id=null;
    nuevoEquipo.federacionNombre = this.federacion;
    // Aquí deberías llamar al servicio para crear el equipo
    this.equipoService.crearEquipo(nuevoEquipo, this.escudo).subscribe(

      response => {
        // Maneja la respuesta del servidor aquí
        Swal.fire('Éxito', 'Equipo cread correctamente', 'success');
        // Cierra el formulario
        form.resetForm();
        this.getEquipos('null');
      },
      error => {
        if (error.status === 200){
          Swal.fire('Éxito', 'Equipo cread correctamente', 'success');
          // Cierra el formulario
          form.resetForm();
          this.getEquipos('null');
        }else{
        Swal.fire('Error', 'No se pudo crear el equipo', 'error');
      }}
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
        this.equipoService.eliminarEquipo(id).subscribe(
          data => {
            this.getEquipos('null');
            Swal.fire('Éxito', 'Equipo eliminado correctamente', 'success');
          },
          err => {
            console.log(err);
            Swal.fire('Error', 'No se pudo eliminar el equipo', 'error');
          }
        );
      }
    });
  }

  getImgSrc(imagen) {
    // Sanitiza la URL para evitar problemas de seguridad
    const sanitizedImage = this.sanitizer.bypassSecurityTrustUrl(`data:image;base64,${imagen}`);

    return sanitizedImage;
  }

  abrirModalDeEdicionEquipo(modal: any, equipo: Object) {
    // Clonar el objeto del equipo seleccionado para evitar modificar el original
    const equipoEditado = { ...equipo };

    // Abrir el modal de creación de equipo con los datos del equipo seleccionado
    const modalRef = this.modalService.open(modal);
    this.nuevoEquipo = equipoEditado;
    modalRef.componentInstance.nuevoEquipo = this.nuevoEquipo;
    modalRef.componentInstance.id = this.nuevoEquipo.id; // Agregar una bandera para indicar que es una edición
  }
}
