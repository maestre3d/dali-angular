import { Component, OnInit, ViewChild } from '@angular/core';
import {MatTableDataSource, MatPaginator, MatSort} from '@angular/material';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/models/user';

export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
  quantity: number;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H', quantity: 0},
  {position: 2, name: 'Helium', weight: 4.0026, symbol: 'He', quantity: 0},
  {position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li', quantity: 0},
  {position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be', quantity: 0},
  {position: 5, name: 'Boron', weight: 10.811, symbol: 'B', quantity: 0},
  {position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C', quantity: 0},
  {position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N', quantity: 0},
  {position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O', quantity: 0},
  {position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F', quantity: 0},
  {position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne', quantity: 0},
];

@Component({
  selector: 'app-store',
  templateUrl: './store.component.html',
  styleUrls: ['./store.component.css']
})
export class StoreComponent implements OnInit {

  public identity: User;
  public token: string;

  displayedColumns: string[] = ['position', 'name', 'weight', 'symbol', 'quantity'];
  dataSource = new MatTableDataSource(ELEMENT_DATA);
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private userService: UserService) {
    this.identity = userService.getIdentity();
    this.token = userService.getToken();
  }

  ngOnInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

}
