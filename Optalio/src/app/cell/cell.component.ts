import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-cell',
  templateUrl: './cell.component.html',
  styleUrls: ['./cell.component.css']
})
export class CellComponent implements OnInit {

  @Input() public value ;
  @Input() public colon ;
  @Input() public row ;

  constructor() {
    this.value = ''
    this.colon = 0
    this.row = 0
  }

  ngOnInit(): void {
  }

}
