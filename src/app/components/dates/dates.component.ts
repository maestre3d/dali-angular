import { Component, OnInit, ViewChild, AfterViewInit, OnDestroy } from '@angular/core';
import {SelectionModel} from '@angular/cdk/collections';
import {MatPaginator, MatTableDataSource, MatSort, MatDialog, MatSnackBar} from '@angular/material';
import { DialogComponent } from '../shared/dialog.component';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/models/user';
import { Appoint } from 'src/app/models/appoint';
import { ServicesService } from 'src/app/services/services.service';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-dates',
  templateUrl: './dates.component.html',
  styleUrls: ['./dates.component.css']
})
export class DatesComponent implements OnInit, AfterViewInit, OnDestroy {
  identity: User;
  appoints: Appoint[] = [];
  actives: Appoint[] = [];
  active: Appoint;
  loading = false;
  errflag = true;
  sub: Subscription;

  // TABLE Stuff
  displayedColumns: string[] = ['name', 'services', 'date'];
  dataSource: MatTableDataSource<Appoint>;
  selection = new SelectionModel<Appoint>(true, []);

  value: string;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  // Dialog
  response: string;
  title: string;
  content: string;

  constructor(public dialog: MatDialog,
              private snackBar: MatSnackBar,
              private router: Router, private userService: UserService, private servicesService: ServicesService) {
    this.identity = userService.getIdentity();
  }


  // TODO: ADD NOT DATA FOUND PLACEHOLDER, CONNECTION ERROR PLACEHOLDER FOR DATES
  async ngOnInit() {
    // Load main page / actives
    this.active = null;
    this.loading = true;
    this.response = null;
    this.refreshActive();
    this.refreshPending();
  }

  ngOnDestroy() {
    if(this.sub) { this.sub.unsubscribe(); }
    // this.dataSource.disconnect();
  }

  async ngAfterViewInit() {
    const tmp = await this.refreshHistory();
    setTimeout(() => {
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    }, 500);
  }

  refreshHistory() {
    return new Promise( resolve => {
        // Load history
        this.sub = this.userService.getDatesHistory(this.identity._id)
        .subscribe( (data: any) => {
          data.appoints.forEach(element => {
            this.appoints.push(element);
          });
          this.dataSource = new MatTableDataSource(this.appoints);
          this.dataSource.paginator = this.paginator;
          this.loading = false;
          this.errflag = false;
          this.dataSource.sort = this.sort;
          resolve();
        }, err => {
          if (err) {
            this.errflag = true;
            this.loading = false;
            err.status === 0 ? this.openSnackBar('Couldn\'t connect to server.') : null;
          }
        });
    });
  }

  async refreshPending() {
    this.sub = await this.userService.getActiveBooks(this.identity._id).subscribe((data: any) => {
      data.appoints.forEach(element => {
        this.loading = false;
        this.errflag = false;
        this.actives.push(element);
      });
      // this.sub.unsubscribe();
    }, err => {
      if (err) {
        this.errflag = true;
        this.loading = false;
        // this.sub.unsubscribe();
        err.status === 0 ? this.openSnackBar('Couldn\'t connect to server.') : null;
      }
    });
  }

  
  refreshActive() {
    this.sub = this.servicesService.getActive().subscribe((data: any) => {
      // console.log(data);
      this.active = data.appoint;
      // console.log(this.active);
    }, err => {
      if (err) {
        err.status === 0 ? this.openSnackBar('Couldn\'t connect to server.') : this.active = null;
      }
    });
  }


  // Table
  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyClear() {
    this.value = '';
    this.applyFilter(this.value);
  }

  deleteBook(book: string) {
    this.response = '0';
    const dialogRef = this.dialog.open(DialogComponent, {
      data: {title: 'Borrar Cita', response: this.response, content: '¿Desea Eliminar la cita?' }
    });

    this.sub = dialogRef.afterClosed().subscribe(result => {
      // console.log(result);

      if(result) {
        this.sub = this.servicesService.deleteBook(book).subscribe((data) => {
          this.openSnackBar('La Cita ha sido eliminada.');
          this.refreshPending();
        }, err => {
          if (err) {
            err.status === 0 ? this.openSnackBar('Couldn\'t connect to server.') : this.openSnackBar(err.error.message);
          }
        });
      }
    });
  }

  activateBook(id: string) {
    this.response = '0';
    const dialogRef = this.dialog.open(DialogComponent, {
      data: {title: 'Empezar Cita', response: this.response, content: '¿Desea Empezar la cita?' }
    });

    this.sub = dialogRef.afterClosed().subscribe(result => {
      this.response = result;

      if (result) {
        this.sub = this.servicesService.activateDate(id).subscribe((data: any) => {
          this.openSnackBar('La Cita ha sido empezada.');
          this.refreshActive();
          ///
          // ====> BREAKPOINT <=====
          ///
          // this.actives.find(data.appoint);
          this.refreshPending();
        }, err => {
          if (err) {
            // console.log(err);
            err.status === 0 ? this.openSnackBar('Couldn\'t connect to server.') : this.openSnackBar(err.error.message);
          }
        });
      }
    });
  }

  finishBook(id: string) {
    this.response = '0';
    const dialogRef = this.dialog.open(DialogComponent, {
      data: {title: 'Terminar Cita', response: this.response, content: '¿Desea Terminar la cita?' }
    });

    this.sub = dialogRef.afterClosed().subscribe(result => {
      this.response = result;

      if (result) {
        this.sub = this.servicesService.finishDate(id).subscribe((data) => {
          this.openSnackBar('La Cita ha sido terminada.');
          this.refreshActive();
        }, err => {
          if (err) {
            // console.log(err);
            err.status === 0 ? this.openSnackBar('Couldn\'t connect to server.') : this.openSnackBar(err.error.message);
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
