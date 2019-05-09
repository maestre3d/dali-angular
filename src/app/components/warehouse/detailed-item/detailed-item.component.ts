import { Component, OnInit, OnDestroy } from '@angular/core';
import { WarehouseService } from 'src/app/services/warehouse.service';
import { Router } from '@angular/router';
import { ItemService } from 'src/app/services/item.service';
import { Item } from 'src/app/models/item';
import { Subscription } from 'rxjs';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-detailed-item',
  templateUrl: './detailed-item.component.html',
  styleUrls: ['./detailed-item.component.css']
})
export class DetailedItemComponent implements OnInit, OnDestroy {
  public id: string;
  sub: Subscription;
  item: any;
  nameM: string;

  constructor(private router: Router,
              private itemService: ItemService,
              private snackBar: MatSnackBar) {
    (this.itemService.getSItem()) ? this.item = this.itemService.getSItem() :
    this.item = new Item(null, null, null, null, 0, 0);
  }

  ngOnInit() {
    (this.itemService.getSItem()) ? this.nameM = this.itemService.getSItem().name :
    this.nameM = null;
    // this.id = this.route.snapshot.paramMap.get('id');
  }

  ngOnDestroy() {
    if ( this.sub ) { this.sub.unsubscribe(); }
  }

  // If ID = null => Creating Item
  onSubmit() {
    if (!this.item._id ) {
      this.item.name = this.nameM;
      this.sub = this.itemService.addItem(this.item).subscribe(data => this.router.navigate(['/warehouse']),
                                                                                    err  => this.openSnackBar(err.error.message));
    }
    else {
      if (this.item.name === this.nameM) {
        this.item.name = null;
        this.sub = this.itemService.updateItem(this.item).subscribe(data => {
          this.router.navigate(['/warehouse'])
        },
        err  => this.openSnackBar(err.error.message));
        return;
      }
      this.item.name = this.nameM;
      this.sub = this.itemService.updateItem(this.item).subscribe(data => {
        this.router.navigate(['/warehouse'])
      },
      err  => this.openSnackBar(err.error.message));
    }
  }

  openSnackBar(message: string, action?: string) {
    message = `${message}`;
    action = 'OK';
    this.snackBar.open(message, action, {
      duration: 10000,
    });
  }

}
