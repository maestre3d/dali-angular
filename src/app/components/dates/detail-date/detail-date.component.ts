import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import { MatSnackBar } from '@angular/material';
import { Router } from '@angular/router';
import { ServicesService } from 'src/app/services/services.service';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/user.service';

export interface IHours {
  value: any;
  viewValue: string;
}

export interface IClient {
  name: string;
  surname: string;
}

@Component({
  selector: 'app-detail-date',
  templateUrl: './detail-date.component.html',
  styleUrls: ['./detail-date.component.css']
})
export class DetailDateComponent implements OnInit {
  identity: User;
  // Stepper
  isLinear = true;
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;

  // Client
  user: any;

  // Checkbox
  services = [];
  // Hours
  hours: IHours[] = [];

  constructor(private _formBuilder: FormBuilder,
              private snackBar: MatSnackBar,
              private router: Router,
              private _Services: ServicesService,
              private userService: UserService) {

    this.identity = userService.getIdentity();
    const hour = new Date();
    for ( let i = 7; i < 22; i++ ) {
      this.hours.push({value: hour.setHours(i, 0, 0, 0),
        viewValue: hour.toLocaleString([], {hour: '2-digit', minute: '2-digit', hour12: true})});
      this.hours.push({value: hour.setHours(i, 30, 0, 0),
        viewValue: hour.toLocaleString([], {hour: '2-digit', minute: '2-digit', hour12: true})});
    }
    // Get services through HTTTP
    _Services.getServices().subscribe((data: any) => {
      data.services.forEach(element => {
        this.services.push({value: element._id, name: element.name, flag: false});
      });
    });

  }

  ngOnInit() {
    this.firstFormGroup = this._formBuilder.group({
      firstCtrl: ['', Validators.required],
      secondCtrl: ['', Validators.required],
      thirdCtrl: ['', Validators.required]
    });
    this.secondFormGroup = this._formBuilder.group({
      // fourthCtrl: ['', Validators.required]
    });
  }

  openSnackBar(message: string, action?: string) {
    message = `${message}`;
    action = 'OK';
    this.snackBar.open(message, action, {
      duration: 10000,
    });
  }

  CheckServices(): boolean {
    let isEmpty = 0;
    this.services.forEach(element => {
      element.flag === false ? isEmpty++ : null;
    });
    return (isEmpty === this.services.length) ?  true : false;
  }

  onSubmit() {
    this.user = {
      name: this.firstFormGroup.controls.firstCtrl.value,
      surname: this.firstFormGroup.controls.secondCtrl.value
    };

    // this.user.name = this.firstFormGroup.get('firstCtrl').value;
    const params = {
      employee: this.identity.username,
      service: [],
      time: this.firstFormGroup.controls.thirdCtrl.value,
      costumer: `${this.user.name} ${this.user.surname}`
    };

    // console.log(this.firstFormGroup.controls.thirdCtrl.value.getTime());

    //  Sent selected service's ID
    this.services.forEach(element => {
      element.flag === true ? params.service.push(element.value) : null;
    });

    // console.log(params);

    this._Services.bookDate(params).subscribe((data: any) => {
      // console.log(data);
      this.openSnackBar('Cita agendada correctamente.');
      this.router.navigate(['/dates']);
    }, err => {
      if (err) {
        this.openSnackBar(err.error.message);
      }
    });
  }
}
