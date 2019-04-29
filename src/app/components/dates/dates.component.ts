import { Component, OnInit, ViewChild } from '@angular/core';
import {SelectionModel} from '@angular/cdk/collections';
import {MatPaginator, MatTableDataSource, MatSort, MatDialog, MatSnackBar} from '@angular/material';
import { DialogComponent } from '../shared/dialog.component';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/models/user';
import { Appoint } from 'src/app/models/appoint';
import { ServicesService } from 'src/app/services/services.service';

@Component({
  selector: 'app-dates',
  templateUrl: './dates.component.html',
  styleUrls: ['./dates.component.css']
})
export class DatesComponent implements OnInit {
  identity: User;
  appoints: Appoint[] = [];
  actives: Appoint[] = [];
  loading = false;

  // TABLE Stuff
  displayedColumns: string[] = ['name', 'services', 'date'];
  dataSource = new MatTableDataSource<Appoint>(this.appoints);
  selection = new SelectionModel<Appoint>(true, []);

  value: string;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  // Dialog
  flag: boolean;
  title: string;
  content: string;

  constructor(public dialog: MatDialog,
              private snackBar: MatSnackBar,
              private router: Router, private userService: UserService, private servicesService: ServicesService) {
    this.identity = userService.getIdentity();
    // Load main page / actives
    this.loading = true;
    this.userService.getActiveBooks(this.identity.username).subscribe((data: any) => {
      data.appoints.forEach(element => {
        this.loading = false;
        this.actives.push(element);
      });
    }, err => {
      if (err) {
        this.openSnackBar(err.error.message);
      }
    });
    // Load history
    this.userService.getDatesHistory(this.identity._id)
        .subscribe( (data: any) => {
          data.appoints.forEach(element => {
            this.appoints.push(element);
          });
        }, err => {
          if (err) {
            this.openSnackBar(err.error.message);
          }
        });

    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
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

  deleteBook(book: string) {
    const dialogRef = this.dialog.open(DialogComponent, {
      data: {title:'Borrar Cita', flag: this.flag, content: '¿Desea Eliminar la cita?' }
    });

    dialogRef.afterClosed().subscribe(result => {
      this.flag = result;
      console.log(result);

      if(!result) {
        this.servicesService.deleteBook(book).subscribe((data) => {
          this.openSnackBar('La Cita ha sido eliminada.');
          this.router.navigate(['/dates']);
        }, err => {
          if (err) {
            this.openSnackBar(err.error.message);
          }
        });
      }
    });

  }

  openSnackBar(message: string, action?: string) {
    message = `${message}`;
    action = 'OK';
    this.snackBar.open(message, action, {
      duration: 10000,
    });
  }

}
