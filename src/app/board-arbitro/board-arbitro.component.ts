import {Component, OnInit} from '@angular/core';
import {MarcadorService} from '../_services/marcador/marcador.service';
import {TokenStorageService} from '../_services/token-storage.service';
import {PartidoService} from '../_services/Partido/partido.service';
import {DomSanitizer} from '@angular/platform-browser';

@Component({
  selector: 'app-board-user',
  templateUrl: './board-arbitro.component.html',
  styleUrls: ['./board-arbitro.component.css']
})
export class BoardArbitroComponent implements OnInit {

  content: any;
  partidos: any;
  private currentUser: any;

  constructor(private sanitizer: DomSanitizer,private marcadorService: MarcadorService,private partidoService: PartidoService, private token: TokenStorageService) { }

  ngOnInit(): void {
    this.currentUser = this.token.getUser();
    this.marcadorService.getPartidosByUserId(this.currentUser.id).subscribe(
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
}
