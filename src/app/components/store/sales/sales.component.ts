import { Component, OnInit, ViewChild } from '@angular/core';
import {MatTableDataSource, MatPaginator, MatSort} from '@angular/material';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import { MatSnackBar } from '@angular/material';
import { Router } from '@angular/router';
import {SelectionModel} from '@angular/cdk/collections';


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
  selector: 'app-sales',
  templateUrl: './sales.component.html',
  styleUrls: ['./sales.component.css']
})
export class SalesComponent implements OnInit {

  // Stepper
  isLinear = true;
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;

  // Table
  displayedColumns: string[] = ['select', 'name', 'weight', 'symbol', 'quantity'];
  dataSource = new MatTableDataSource(ELEMENT_DATA);
  selection = new SelectionModel<PeriodicElement>(true, []);
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  // Checkbox
  cc = true;
  cb = false;
  tf = false;


  constructor(private _formBuilder: FormBuilder, private snackBar: MatSnackBar, private router: Router) {}

  ngOnInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;

    this.firstFormGroup = this._formBuilder.group({
      firstCtrl: ['', Validators.required],
      secondCtrl: ['', Validators.required]
    });
    this.secondFormGroup = this._formBuilder.group({
      // fourthCtrl: ['', Validators.required]
    });
  }

  openSnackBar(message: string, action?: string) {
    this.router.navigate(['/store']);
    message = `${message}`;
    action = 'OK';
    this.snackBar.open(message, action, {
      duration: 2000,
    });
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle() {
    this.isAllSelected() ?
        this.selection.clear() :
        this.dataSource.data.forEach(row => this.selection.select(row));
  }

  /** The label for the checkbox on the passed row */
  checkboxLabel(row?: PeriodicElement): string {
    if (!row) {
      return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.position + 1}`;
  }

  getItems() {
    console.log(this.selection.selected);
  }

  validateItems(): boolean {
    if ( this.selection.selected.length === 0 ) {return false;}
    let res: boolean;

    this.selection.selected.forEach(element => {
      res = (element.quantity > 0) ? true : false;
    });
    console.log(res);
    return res;
  }

}
