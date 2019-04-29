import { Component, OnInit } from '@angular/core';
import { WarehouseService } from 'src/app/services/warehouse.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-detailed-item',
  templateUrl: './detailed-item.component.html',
  styleUrls: ['./detailed-item.component.css']
})
export class DetailedItemComponent implements OnInit {

  item: any;

  constructor(private warehouse: WarehouseService, private router: Router) {
    this.item = {
      name: 'Suavecito Pomade',
      brand: 'Suavecito',
      price: 100
    };

  }

  ngOnInit() {
  }

  onSubmit() {
    console.log(`sending request to API ... `);
    console.log(this.item);
    this.router.navigate(['/warehouse']);
  }

}
