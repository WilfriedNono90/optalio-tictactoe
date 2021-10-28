import { Component, OnInit } from '@angular/core';
import {NgForm} from "@angular/forms";

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.css']
})
export class BoardComponent implements OnInit {

  public rows = [0,1,2]
  public colons = [0,1,2]

  public taffel : string[][]
  public player1:string ;
  public player2:string;
  public play = true;
  public gameOver = false;
  public gameStart = true;
  public score : number[][];
  winner : string = ''

  constructor() {
    this.taffel = [];
    this.score = [];
    this.player1 = 'Name1'
    this.player2 = 'Name2'
  }

  ngOnInit(): void {

    this.initialise()
    console.log(this.taffel)
    console.log(this.score)
  }

  initialise () {
    this.initialiseTaffel()
    this.initialiseScore()
    this.gameOver = false
    this.play = true;

  }

  startGame(input:NgForm) {
    if (this.gameStart) {
      this.player2 = input.value.player2
      this.player1 = input.value.player1
      this.gameStart = false
    }
    this.gameOver = false
    this.play = true

    this.initialiseTaffel()

  }

  getWinner() {
    if (this.winner !== '') {
      return this.winner
    } else {
      if (this.play) return this.player1
      else return this.player2
    }
  }

  initialiseTaffel() {
    for (let i = 0; i < this.rows.length; i++) {
      this.taffel[i] = []
      for (let j = 0; j < this.colons.length; j++) {
        this.taffel[i][j] = '';
      }
    }
  }

  initialiseScore() {
    for (let i = 0; i < 2; i++) {
      this.score[i] = []
      for (let j = 0; j < 3; j++) {
        this.score[i][j] = 0;
      }
    }
  }

  playerPlay(row:number,colon:number) {
    if (!this.gameOver && this.taffel[row][colon] === '') {
      this.taffel[row][colon] = this.getCurrentSign()
      console.log(this.taffel)
    }
    if (!this.isNotDecided()) {
      // es gibt noch freie plätze
      if (!this.isAWin()) {
        //man kan weiter spielen
        //der andere Spieler ist dran
        this.play = !this.play
      } else {
        //man kann nicht mehr spielen. ergebnisse müssen angezeigt werden
        if (this.play) {
          //player 1 won
          this.score[0][0] += 1
          this.score[1][2] += 1
        } else {
          //player 2 won
          this.score[0][2] += 1
          this.score[1][0] += 1
        }
        this.endGame('')
      }
    } else {
      //man kann nicht mehr spielen. ergebnisse müssen angezeigt werden
      //unentschieden
      this.score[0][1] += 1
      this.score[1][1] += 1
      this.endGame('Niemand')
    }


  }

  endGame(input:string) {
    this.gameOver = true
    if (input !== '') this.winner = input
  }

  getCurrentSign() : string {
    return  this.play ? 'X' : 'O'
  }

  isNotDecided() : boolean {
    for (let i = 0; i < this.taffel.length; i++) {
      for (let j = 0; j < this.taffel[0].length; j++) {
        if (this.taffel[i][j] === '') return false
      }
    }
    return true;
  }

  isAWin() : boolean {
    for (let i = 0; i < this.taffel.length; i++) {
      if (this.taffel[i][0] === this.taffel[i][1] && this.taffel[i][0] === this.taffel[i][2] && this.taffel[i][0] !== '') {
        return true
      }
    }
    for (let i = 0; i < this.taffel.length; i++) {
      if (this.taffel[0][i] === this.taffel[1][i] && this.taffel[0][i] === this.taffel[2][i] && this.taffel[0][i] !== '') {
        return true
      }
    }
    if (this.taffel[0][0] === this.taffel[1][1] && this.taffel[0][0] === this.taffel[2][2] && this.taffel[0][0] !== '') {
      return true
    }
    if (this.taffel[0][2] === this.taffel[1][1] && this.taffel[0][2] === this.taffel[2][0] && this.taffel[0][2] !== '') {
      return true
    }
    return false;

  }

  getPosition1() : number {
    if (this.score[0][0] > this.score[1][0]) return 1
    else if (this.score[0][0] < this.score[1][0]) return 2
    else return 0
  }

  getPosition2() : number {
    if (this.getPosition1() === 1 ) return 2
    else if (this.getPosition1() === 2) return 1
    else return 0
  }

}
