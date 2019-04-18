import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/models/user';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  userInput: string;
  passInput: string;
  token: string;
  identity: User;

  constructor(private snackBar: MatSnackBar, private userService: UserService, private router: Router) { }

  ngOnInit() {
  }

  getLogged() {
    const params = {
      username: this.userInput,
      password: this.passInput,
      getToken: null
    };

    this.userService.logIn(params).subscribe( (data: any) => {

      this.identity = data.user;
      this.openSnackBar(`¡Bienvenido ${this.identity.name} ${this.identity.surname}!`);
      localStorage.setItem('identity', JSON.stringify(this.identity));

      this.userService.logIn(params, 'true').subscribe( (tokenized: any) => {
        this.token = tokenized.token;
        if(this.token.length <= 0) {
          console.log('Token not created');
        } else {
          localStorage.setItem('token', this.token);
          console.log(localStorage.getItem('token') + '  => ' + localStorage.getItem('identity'));
          this.router.navigate(['/home']);
          window.location.reload();
        }
      },
      error =>{
        if (error) {
          console.log(error.error.message);
          this.openSnackBar(error.error.message);
        }
      });
    },
    error => {
      if (error.status !== 0) {
        this.openSnackBar(error.error.message);
      } else {
        this.openSnackBar(`Couldn't connect to server`);
      }

    });
  }

  openSnackBar(message: string, action?: string) {
    message = `${message}`;
    action = 'OK';
    this.snackBar.open(message, action, {
      duration: 2000,
    });
  }

}
