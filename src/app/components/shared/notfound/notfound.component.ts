import { Component, OnInit, OnDestroy, AfterViewInit } from '@angular/core';
import { WOW } from 'wowjs/dist/wow';

@Component({
  selector: 'app-notfound',
  templateUrl: './notfound.component.html',
  styleUrls: ['./notfound.component.css']
})

export class NotfoundComponent implements OnInit, OnDestroy, AfterViewInit {

  wow = new WOW({
    live: false
  });

  constructor() {
  }

  ngOnInit() {
    this.wow.init();
  }

  ngOnDestroy() {
  }

  ngAfterViewInit() {
  }

}
