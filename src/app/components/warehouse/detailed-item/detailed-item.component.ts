import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-detailed-item',
  templateUrl: './detailed-item.component.html',
  styleUrls: ['./detailed-item.component.css']
})
export class DetailedItemComponent implements OnInit {

  item: any;

  constructor() { }

  ngOnInit() {
  }

}
