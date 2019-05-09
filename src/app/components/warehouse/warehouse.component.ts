import { Component, OnInit, ViewChild, AfterViewInit, OnDestroy } from '@angular/core';
import {SelectionModel} from '@angular/cdk/collections';
import {MatPaginator, MatTableDataSource, MatSort, MatSnackBar} from '@angular/material';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/user.service';
import { ItemService } from 'src/app/services/item.service';
import { Item } from 'src/app/models/item';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-warehouse',
  templateUrl: './warehouse.component.html',
  styleUrls: ['./warehouse.component.css']
})
export class WarehouseComponent implements OnInit, AfterViewInit, OnDestroy {

  public identity: User;
  public token: string;
  sub: Subscription;
  loading = false;
  errflag = true;
  items: Item[] = [];
  displayedColumns: string[] = ['name', 'brand', 'price', 'stock', 'admin'];
  dataSource: MatTableDataSource<Item>;
  selection = new SelectionModel<Item>(true, []);

  value: string;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private userService: UserService, private itemService: ItemService, private snackBar: MatSnackBar,
              private router: Router) {
    this.identity = this.userService.getIdentity();
    this.token = this.userService.getToken();
    this.dataSource = null;
   }

  ngOnInit() {
    if (this.identity.role === 'ROLE_USER') {
      this.displayedColumns = ['name', 'brand', 'price', 'stock'];
    }
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
    // this.dataSource.disconnect();
  }

  async ngAfterViewInit() {
    const tmp = await this.refreshItems();
    setTimeout(() => {
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    }, 100);
  }

  refreshItems() {
    return new Promise(resolve => {
      this.sub = this.itemService.getItems().subscribe((data: any) => {
        data.items.forEach(element => {
          this.items.push(element);
        });
        this.dataSource = new MatTableDataSource(data.items);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        this.errflag = false;
        this.loading = false;
        resolve(data.items[0].name);
      }, err => {
        if (err) {
          this.loading = false;
          this.errflag = true;
          err.status === 0 ? this.openSnackBar('Couldn\'t connect to server.') : this.openSnackBar(err.error.message);
        }
      });
    });
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();

  }

  applyClear() {
    this.value = '';
    this.applyFilter(this.value);
  }

  editRow(row?: any) {
    // console.log(`Selected ${row._id} => ${row.name} `);
    this.itemService.setItem(row);
  }

  deleteMaterial(row?: any) {
    this.loading = true;
    // console.log(`Deleting ${row._id} => ${row.name}`);
    this.sub = this.itemService.deleteItem(row._id).subscribe((data: any) => {
      this.refreshItems();
      this.openSnackBar(`${data.item.name} deleted successfully.`);
    }, err => {
      if (err) {
        // console.log(err);
        this.loading = true;
        err.status === 0 ? this.openSnackBar('Couldn\'t connect to server.') : this.openSnackBar(err.error.message);
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

  addItem() {
    this.itemService.setItem(null);
    this.router.navigate(['/warehouse/item']);
  }
}
