import {Component, OnInit} from '@angular/core';
import {UserService} from '../_services/user.service';

@Component({
  selector: 'app-board-user',
  templateUrl: './board-arbitro.component.html',
  styleUrls: ['./board-arbitro.component.css']
})
export class BoardArbitroComponent implements OnInit {

  content: string;

  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.userService.getUserBoard().subscribe(
      data => {
        this.content = data;
      },
      err => {
        this.content = JSON.parse(err.error).message;
      }
    );
  }

}
