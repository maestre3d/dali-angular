import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ThemeService } from 'src/app/services/theme.service';
import { MatBottomSheet, MatBottomSheetRef } from '@angular/material';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/models/user';

@Component({
  selector: 'app-bottom-sheet',
  templateUrl: '../shared/bottom-sheet.html'
})
export class BottomSheetComponent {
  constructor(private bottomSheetRef: MatBottomSheetRef<BottomSheetComponent>) {}

  openLink(event: MouseEvent): void {
    this.bottomSheetRef.dismiss();
    // event.preventDefault();
  }
}

@Component({
  selector: 'app-config',
  templateUrl: './config.component.html',
  styleUrls: ['./config.component.css']
})
export class ConfigComponent implements OnInit {
  public identity: User;
  public token: string;
  isDarkTheme: Observable<boolean>;
  selected = 'option 2';
  tabLoadTimes: Date[] = [];

  constructor(private themeService: ThemeService, private bottomSheet: MatBottomSheet, private userService: UserService) {
    this.identity = userService.getIdentity();
    this.token = userService.getToken();
  }

  ngOnInit() {
    this.isDarkTheme = this.themeService.isDarkTheme;
  }

  getTimeLoaded(index: number) {
    if (!this.tabLoadTimes[index]) {
      this.tabLoadTimes[index] = new Date();
    }

    return this.tabLoadTimes[index];
  }

  toggleDarkTheme(checked: boolean) {
    this.themeService.setDarkTheme(checked);
  }

  openBottomSheet(): void {
    this.bottomSheet.open(BottomSheetComponent);
  }

}
