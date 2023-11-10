import {Component, OnInit} from '@angular/core';
import {UserService} from '../_services/user.service';
import {ActivatedRoute} from '@angular/router';
import {FederacionService} from '../_services/Federacion/federacion.service';

@Component({
  selector: 'app-federaciones',
  templateUrl: './federaciones.component.html',
  styleUrls: ['./federaciones.component.css']
})
export class FederacionesComponent implements OnInit {

  content: string;

  constructor(private rutaActiva: ActivatedRoute, private federacionService: FederacionService) { }

  ngOnInit(): void {
    this.federacionService.getByName(this.rutaActiva.snapshot.params.federacion)
      .subscribe(
      data => {
        this.content = data[0];
      },
      err => {
        this.content = JSON.parse(err.error).message;
      }
    );
  }

}
