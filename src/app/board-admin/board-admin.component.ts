import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { UserService } from '../_services/user.service';
import {PartidoDTO} from '../DTO/partido.dto';
import {PartidoService} from '../_services/Partido/partido.service';
import Swal from 'sweetalert2';
import {EquipoService} from '../_services/Equipo/equipo.service';
import {TokenStorageService} from '../_services/token-storage.service';

@Component({
  selector: 'app-board-admin',
  templateUrl: './board-admin.component.html',
  styleUrls: ['./board-admin.component.css']
})
export class BoardAdminComponent implements OnInit {

  content: string;
  federacion = 'null';
  users: any;
  filteredUsers: any[] = [];
  searchText: string;
  nuevoPartido: any;
  opcion: number = 0;
  nuevoEquipo: any = {}; // Asegúrate de tener un objeto para almacenar la información del nuevo equipo

  private pattern: string;

  // Agrega el servicio del modal
  private currentUser: any;
  adminFederations: any;
  constructor(
    private tokenStorage: TokenStorageService,
    private userService: UserService,
    private partidoService: PartidoService,
    private modalService: NgbModal,
    private equipoService: EquipoService
  ) {
  }

  ngOnInit(): void {
    this.currentUser = this.tokenStorage.getUser();
    this.adminFederations = this.currentUser.roles
      .filter((rol: string) => rol.startsWith('ROLE_ADMIN')).map((rol: string) => rol.split(':')[1]);
    console.log(this.adminFederations);
    if (this.adminFederations.length == 1){
      this.federacion = this.adminFederations[0];
    }
    this.userService.getUsers(this.federacion, 'null').subscribe(
      data => {
        this.users = data;
        this.filteredUsers = this.users;
      },
      err => {
        this.content = JSON.parse(err.error).message;
      }
    );
    console.log(this.adminFederations);
  }

  cambiarOpcion(opcion: number): void {
    this.opcion = opcion;
  }
  //TODO ICONOS cambiar editar y eliminar por iconos, meter un text over para mostrar el texto de que es
  // Resto del código
  handleFederationSelect(selectedFederation: any) {
    this.federacion =selectedFederation;
  }
}
