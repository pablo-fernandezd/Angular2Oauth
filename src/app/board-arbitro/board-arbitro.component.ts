import {Component, OnInit} from '@angular/core';
import {MarcadorService} from '../_services/marcador/marcador.service';
import {TokenStorageService} from '../_services/token-storage.service';

@Component({
  selector: 'app-board-user',
  templateUrl: './board-arbitro.component.html',
  styleUrls: ['./board-arbitro.component.css']
})
export class BoardArbitroComponent implements OnInit {

  content: string;
  private currentUser: any;

  constructor(private marcadorService: MarcadorService, private token: TokenStorageService) { }

  ngOnInit(): void {
    this.currentUser = this.token.getUser();
    this.marcadorService.getPartidosByUserId(this.currentUser.id).subscribe(
      data => {
        this.content = data;
        console.log(this.content);
      },
      err => {
        this.content = JSON.parse(err.error).message;
      }
    );
  }

}
