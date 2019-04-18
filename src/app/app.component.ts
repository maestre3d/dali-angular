import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ThemeService } from './services/theme.service';
import { GLOBAL } from './services/global';
import { UserService } from './services/user.service';
import { User } from './models/user';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})

export class AppComponent implements OnInit {
  public identity: User;
  public token: string;
  title = 'antanos';
  isDarkTheme: Observable<boolean>;
  url: string;

  constructor(private themeService: ThemeService, private userService: UserService) {
    this.url = GLOBAL.url;
  }

  ngOnInit() {
    this.isDarkTheme = this.themeService.isDarkTheme;
    this.identity = this.userService.getIdentity();
    this.token = this.userService.getToken();
  }
}
