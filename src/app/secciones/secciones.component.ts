import {Component, Input, OnInit} from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { UserService } from '../_services/user.service';
import {PartidoService} from '../_services/Partido/partido.service';
import Swal from 'sweetalert2';
import {EquipoService} from '../_services/Equipo/equipo.service';
import {DomSanitizer} from '@angular/platform-browser';
import {SeccionService} from '../_services/Seccion/seccion.service';

@Component({
  selector: 'app-secciones',
  templateUrl: './secciones.component.html',
  styleUrls: ['./secciones.component.css']
})
export class SeccionesComponent implements OnInit {
  @Input() federacion: string;
  id: number = null;
  content: string;
  users: any[] = [];
  filteredUsers: any[] = [];
  searchText: string;
  nuevoPartido: any = {};
  nuevoEquipo: any = {}; // Asegúrate de tener un objeto para almacenar la información del nuevo equipo

  private pattern: string;

  // Agrega el servicio del modal
  public secciones: any;
  constructor(
    private sanitizer: DomSanitizer,
    private userService: UserService,
    private partidoService: PartidoService,
    private modalService: NgbModal,
    private seccionesService: SeccionService
  ) {
  }

  ngOnInit(): void {
    this.getSecciones();
  }

  getSecciones() {
    this.seccionesService.getByFederacion(this.federacion).subscribe(
      data => {
        this.secciones = data;
        this.filteredUsers = this.users;
      },
      err => {
        this.content = JSON.parse(err.error).message;
      }
    );
  }

  // Filtra la lista de usuarios según el texto de búsqueda
  private escudo: File;


  abrirModalDeCreacionEquipo(content: any,seccionId: any) {
    this.nuevoEquipo.seccionId = seccionId;
    this.modalService.open(content, { centered: true });
  }

  onFileChange(event: any) {
    const fileList: FileList = event.target.files;
    if (fileList.length > 0) {
      this.escudo = fileList[0];
    }
  }

  crearEntrada(nuevoEquipo: any, form: any) {
    // tslint:disable-next-line:triple-equals
    if (this.escudo == undefined) {
      this.escudo = null;
    }
    if (nuevoEquipo.id == undefined)
      nuevoEquipo.id=null;
    nuevoEquipo.federacionNombre = this.federacion;
    // Aquí deberías llamar al servicio para crear el equipo
    this.seccionesService.crearEntrada(nuevoEquipo, this.escudo).subscribe(

      response => {
        // Maneja la respuesta del servidor aquí
        Swal.fire('Éxito', 'Entrada creada correctamente', 'success');
        // Cierra el formulario
        form.resetForm();
        this.nuevoEquipo=null;
        this.getSecciones();
      },
      error => {
        if (error.status === 200){
          Swal.fire('Éxito', 'Entrada creada correctamente', 'success');
          // Cierra el formulario
          form.resetForm();
          this.getSecciones();
        }else{
        Swal.fire('Error', 'No se pudo crear la entrada', 'error');
      }}
    );
  }
  crearSeccion(nuevaSeccion: any, form: any) {
    // tslint:disable-next-line:triple-equals
    if (this.escudo == undefined) {
      this.escudo = null;
    }
    if (nuevaSeccion.id == undefined)
      nuevaSeccion.id=null;
    nuevaSeccion.federacionNombre = this.federacion;
    // Aquí deberías llamar al servicio para crear el equipo
    this.seccionesService.crearSeccion(nuevaSeccion).subscribe(

      response => {
        // Maneja la respuesta del servidor aquí
        Swal.fire('Éxito', 'Seccion creada correctamente', 'success');
        // Cierra el formulario
        form.resetForm();
        this.getSecciones();
        nuevaSeccion=null;
      },
      error => {
        if (error.status === 200){
          Swal.fire('Éxito', 'Seccion creada correctamente', 'success');
          // Cierra el formulario
          form.resetForm();
          this.getSecciones();
        }else{
        Swal.fire('Error', 'No se pudo crear la Seccion', 'error');
      }}
    );
  }
  confirmarEliminarSeccion(id) {
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
        this.seccionesService.eliminarSeccion(id).subscribe(
          data => {
            this.getSecciones();
            Swal.fire('Éxito', 'Sección eliminada correctamente', 'success');
          },
          err => {
            Swal.fire('Error', 'No se pudo eliminar la sección', 'error');
          }
        );
      }
    });
  }
  confirmarEliminarEntrada(id) {
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
        this.seccionesService.eliminarEntrada(id).subscribe(
          data => {
            this.getSecciones();
            Swal.fire('Éxito', 'Sección eliminada correctamente', 'success');
          },
          err => {
            Swal.fire('Error', 'No se pudo eliminar la sección', 'error');
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

  abrirModalDeEdicionEntrada(modal: any, equipo: Object) {
    // Clonar el objeto del equipo seleccionado para evitar modificar el original
    const equipoEditado = { ...equipo };

    // Abrir el modal de creación de equipo con los datos del equipo seleccionado
    const modalRef = this.modalService.open(modal);
    this.nuevoEquipo = equipoEditado;
    modalRef.componentInstance.nuevoEquipo = this.nuevoEquipo;
    modalRef.componentInstance.id = this.nuevoEquipo.id; // Agregar una bandera para indicar que es una edición
  }
  collapseStates: { [key: string]: boolean } = {};

  // Método para cambiar el estado del acordeón
  toggleCollapse(id: string) {
    this.collapseStates[id] = !this.collapseStates[id];
  }

  // Método para verificar si el acordeón está abierto
  nuevaSeccion: any;
  isCollapseOpen(id: string): boolean {
    return this.collapseStates[id];
  }

  abrirModalDeCreacionSeccion(content: any) {
    this.nuevaSeccion = {};
    this.modalService.open(content, { centered: true });
  }
  abrirModalDeEdicionSeccion(modal: any, seccion: Object) {
    // Clonar el objeto del equipo seleccionado para evitar modificar el original
    const seccionEditada = { ...seccion };

    // Abrir el modal de creación de equipo con los datos del equipo seleccionado
    const modalRef = this.modalService.open(modal);
    this.nuevaSeccion = seccionEditada;
    modalRef.componentInstance.nuevaSeccion = this.nuevaSeccion;
    modalRef.componentInstance.id = this.nuevaSeccion.id; // Agregar una bandera para indicar que es una edición
  }
}
