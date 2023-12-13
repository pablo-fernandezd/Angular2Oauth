import {Component, Input, OnInit} from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { UserService } from '../_services/user.service';
import {PartidoDTO} from '../DTO/partido.dto';
import {PartidoService} from '../_services/Partido/partido.service';
import Swal from 'sweetalert2';
import {EquipoService} from '../_services/Equipo/equipo.service';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.css']
})
export class UsuariosComponent implements OnInit {

  content: string;
  @Input() federacion: string;
  users: any[] = [];
  filteredUsers: any[] = [];
  searchText: string;
  nuevoPartido: any;
  nuevoEquipo: any = {}; // Asegúrate de tener un objeto para almacenar la información del nuevo equipo

  private pattern: string;

  // Agrega el servicio del modal
  constructor(
    private userService: UserService,
    private partidoService: PartidoService,
    private modalService: NgbModal,
    private equipoService: EquipoService
  ) {
  }

  ngOnInit(): void {
    this.userService.getUsers(this.federacion, 'null').subscribe(
      data => {
        this.users = data;
        this.filteredUsers = this.users;
      },
      err => {
        this.content = JSON.parse(err.error).message;
      }
    );
  }

  abrirModalDeCreacion(content): void {
    this.modalService.open(content, {centered: true});
  }
  toggleArbitro(user: any): void {
    this.userService.toggleArbitro(user, this.federacion).subscribe(
      data => {
        Swal.fire('Éxito', 'Usuario modificado correctamente', 'success');
      },
      err => {
        Swal.fire('Error', 'No se pudieron modificar los roles del usuario', 'error');
      }
    );
  }
  toggleAdmin(user: any): void {
    this.userService.toggleAdmin(user, this.federacion).subscribe(
      data => {
        Swal.fire('Éxito', 'Usuario modificado correctamente', 'success');
      },
      err => {
        Swal.fire('Error', 'No se pudieron modificar los roles del usuario', 'error');
      }
    );
  }

  // Filtra la lista de usuarios según el texto de búsqueda
  private escudo: File;
  filtrarUsuarios(): void {
    this.filteredUsers = this.users.filter(user =>
      user.nombre.toLowerCase().includes(this.searchText.toLowerCase()) ||
      user.apellido1.toLowerCase().includes(this.searchText.toLowerCase()) ||
      user.apellido2.toLowerCase().includes(this.searchText.toLowerCase()) ||
      user.email.toLowerCase().includes(this.searchText.toLowerCase())
    );
  }

  abrirModalDeCreacionEquipo(content: any) {
    this.modalService.open(content, { centered: true });
  }

  onFileChange(event: any) {
    const fileList: FileList = event.target.files;
    if (fileList.length > 0) {
      this.escudo = fileList[0];
    }
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
        this.userService.eliminarUsuario(id).subscribe(
          data => {
            this.filteredUsers = this.filteredUsers.filter(user => user.id !== id);
            Swal.fire('Éxito', 'Usuario eliminado correctamente', 'success');
          },
          err => {
            Swal.fire('Error', 'No se pudo eliminar el usuario', 'error');
          }
        );
      }
    });
  }
}
