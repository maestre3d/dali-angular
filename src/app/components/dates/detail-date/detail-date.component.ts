import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import { MatSnackBar } from '@angular/material';
import { Router } from '@angular/router';

export interface Hours {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-detail-date',
  templateUrl: './detail-date.component.html',
  styleUrls: ['./detail-date.component.css']
})
export class DetailDateComponent implements OnInit {
  // Stepper
  isLinear = true;
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;

  // Checkbox
  cc = true;
  cb = false;
  tf = false;

  // Hours
  hours: Hours[] = [
    {value: '10', viewValue: '10:00 AM'},
    {value: '10.50', viewValue: '10:30 PM'},
    {value: '11', viewValue: '11:00 AM'},
    {value: '12', viewValue: '12:00 PM'},
    {value: '13', viewValue: '1:00 PM'},
    {value: '14', viewValue: '2:00 PM'},
    {value: '15', viewValue: '3:00 PM'},
  ];

  constructor(private _formBuilder: FormBuilder, private snackBar: MatSnackBar, private router: Router) {}

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
    this.router.navigate(['/dates']);
    message = `${message}`;
    action = 'OK';
    this.snackBar.open(message, action, {
      duration: 2000,
    });
  }
}
