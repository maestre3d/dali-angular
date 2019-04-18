import { Component, OnInit, ViewChild } from '@angular/core';
import {SelectionModel} from '@angular/cdk/collections';
import {MatPaginator, MatTableDataSource, MatSort, MatDialog} from '@angular/material';
import { DialogComponent } from '../shared/dialog.component';
import { Router } from '@angular/router';

/* TEMP */
export interface PeriodicElement {
  name: string;
  position: number;
  services: string;
  date: number;
}
const ELEMENT_DATA: PeriodicElement[] = [
  {position: 1, name: 'Jorge Carlos', services: 'CC', date: 1554941484 },
  {position: 2, name: 'Giovanni Luca', services: 'CC', date: 1554941484 },
  {position: 3, name: 'Fernando Estrada', services: 'CC', date: 1554931484 },
  {position: 4, name: 'Hiram Munoz', services: 'CB', date: 1554941484 },
  {position: 5, name: 'Luis Alonso Ruiz', services: 'CC, CB', date: 1554941480 },
  {position: 6, name: 'Gerardo Martinez', services: 'TF', date: 1554941484 },
  {position: 7, name: 'Jonathan Estrada', services: 'CC', date: 1554941484 },
  {position: 8, name: 'Miguel Ruiz', services: 'CB', date: 1554941484 },
  {position: 9, name: 'Lionel Messi', services: 'CC', date: 1554941484 },
  {position: 10, name: 'Juan Carlos Lopez', services: 'TF', date: 1554941484 }
];

/*  END TEMP */

@Component({
  selector: 'app-dates',
  templateUrl: './dates.component.html',
  styleUrls: ['./dates.component.css']
})
export class DatesComponent implements OnInit {
  tabLoadTimes: Date[] = [];

  // TABLE Stuff
  displayedColumns: string[] = ['name', 'services', 'date'];
  dataSource = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);
  selection = new SelectionModel<PeriodicElement>(true, []);

  value: string;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  // Dialog
  flag: boolean;
  title: string;
  content: string;

  constructor(public dialog: MatDialog, private router: Router) {
  }

  ngOnInit() {
  }

  // Dialog
  openDialog(title: string, content: string): void {
    const dialogRef = this.dialog.open(DialogComponent, {
      data: {title: `${title}`, flag: this.flag, content: `${content}` }
    });

    dialogRef.afterClosed().subscribe(result => {
      this.flag = result;
    });
  }

  // Table
  applyFilter(filterValue: string) {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  applyClear() {
    this.value = '';
    this.applyFilter(this.value);
  }

  getTimeLoaded(index: number) {
    if (!this.tabLoadTimes[index]) {
      this.tabLoadTimes[index] = new Date();
    }

    return this.tabLoadTimes[index];
  }

  loadTable() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }
}
