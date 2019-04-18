import { Component, OnInit, ViewChild } from '@angular/core';
import {SelectionModel} from '@angular/cdk/collections';
import {MatPaginator, MatTableDataSource, MatSort} from '@angular/material';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/user.service';


export interface PeriodicElement {
  name: string;
  position: number;
  symbol: string;
  cost: number;
}
const ELEMENT_DATA: PeriodicElement[] = [
  {position: 1, name: 'Hydrogen', symbol: 'H', cost: 150 },
  {position: 2, name: 'Helium', symbol: 'He', cost: 200 },
  {position: 3, name: 'Lithium', symbol: 'Li', cost: 50 },
  {position: 4, name: 'Beryllium', symbol: 'Be', cost: 200 },
  {position: 5, name: 'Boron', symbol: 'B', cost: 100 },
  {position: 6, name: 'Carbon', symbol: 'C', cost: 200 },
  {position: 7, name: 'Nitrogen', symbol: 'N', cost: 75 },
  {position: 8, name: 'Oxygen', symbol: 'O', cost: 100 },
  {position: 9, name: 'Fluorine', symbol: 'F', cost: 50 },
  {position: 10, name: 'Neon', symbol: 'Ne', cost: 70 },
  {position: 11, name: 'Sodium', symbol: 'Na', cost: 25 },
  {position: 12, name: 'Magnesium', symbol: 'Mg', cost: 20 },
  {position: 13, name: 'Aluminum', symbol: 'Al', cost: 100 },
  {position: 14, name: 'Silicon', symbol: 'Si', cost: 450 },
  {position: 15, name: 'Phosphorus', symbol: 'P', cost: 700 },
  {position: 16, name: 'Sulfur', symbol: 'S', cost: 100 },
  {position: 17, name: 'Chlorine', symbol: 'Cl', cost: 25 },
  {position: 18, name: 'Argon', symbol: 'Ar', cost: 100 },
  {position: 19, name: 'Potassium', symbol: 'K', cost: 400 },
  {position: 20, name: 'Calcium', symbol: 'Ca', cost: 125 },
];

@Component({
  selector: 'app-warehouse',
  templateUrl: './warehouse.component.html',
  styleUrls: ['./warehouse.component.css']
})
export class WarehouseComponent implements OnInit {

  public identity: User;
  public token: string;
  displayedColumns: string[] = ['name', 'symbol', 'cost', 'admin'];
  dataSource = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);
  selection = new SelectionModel<PeriodicElement>(true, []);

  value: string;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private userService: UserService) {
    this.identity = userService.getIdentity();
    this.token = userService.getToken();
   }

  ngOnInit() {
    if (this.identity.role === 'ROLE_USER') {
      this.displayedColumns = ['name', 'symbol', 'cost'];
    }
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  applyClear() {
    this.value = '';
    this.applyFilter(this.value);
  }

  editRow(row?: any) {
    console.log(`Selected ${row.position} => ${row.name} `);
  }

  deleteMaterial(row?: any) {
    console.log(`Deleting ${row.position} => ${row.name}`);
  }
}
