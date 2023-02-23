import { Component } from '@angular/core';

@Component({
  selector: 'app-volleyball-scoreboard',
  templateUrl: './score-board.component.html',
  styleUrls: ['./score-board.component.css']
})
export class ScoreBoardComponent {
  set: number = 1;
  maxSets: number = 5;
  teamA: string = 'Equipo A';
  teamB: string = 'Equipo B';
  scoreA: number = 0;
  scoreB: number = 0;
  serving: string = '';

  // Métodos para manejar la lógica del marcador de voleibol
  swapColumns: boolean;
  addPointTeamA() {
    this.scoreA++;
    this.checkServing();
  }

  addPointTeamB() {
    this.scoreB++;
    this.checkServing();
  }

  checkServing() {
    if ((this.scoreA + this.scoreB) % 2 == 0) {
      this.serving = '';
    } else if ((this.scoreA + this.scoreB) % 4 < 2) {
      this.serving = this.teamA;
    } else {
      this.serving = this.teamB;
    }
  }

  switchEquipos() {
    this.swapColumns = !this.swapColumns;
  }

  finishSet() {
    if (this.set < this.maxSets) {
      this.set++;
      this.scoreA = 0;
      this.scoreB = 0;
      this.serving = '';
    }
  }

  finishMatch() {
    this.set = 1;
    this.scoreA = 0;
    this.scoreB = 0;
    this.serving = '';
  }

  resumeSet() {
    this.scoreA = 0;
    this.scoreB = 0;
    this.serving = '';
  }

  resumeMatch() {
    this.set = 1;
    this.scoreA = 0;
    this.scoreB = 0;
    this.serving = '';
  }

  finalizarPartido() {
    console.log("fin");
  }

  finalizarSet() {
    console.log("fin");

  }
  restarPuntosA() {
    this.scoreA--;
  }
  restarPuntosB() {
    this.scoreB--;
  }

  sumarPuntosA() {
    this.scoreA++;
  }
  sumarPuntosB() {
    this.scoreB++;
  }
}


