import { Component, OnInit, AfterViewInit, OnDestroy } from '@angular/core';
import { WOW } from 'wowjs/dist/wow';
import { COMPANY } from '../../services/global';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, AfterViewInit, OnDestroy {

  public identity: User;
  public token: string;
  company: string;

  wow = new WOW({
    live: false
  });

  constructor(private userService: UserService) {
    this.identity = userService.getIdentity();
    this.token = userService.getToken();
    this.company = COMPANY;
  }

  ngOnInit() {
  }

  ngOnDestroy() {
  }

  ngAfterViewInit() {
  }

  onClick() {
  }

}
