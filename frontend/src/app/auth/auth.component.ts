import { Component, OnInit } from '@angular/core';
import { Router } from  '@angular/router';
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { DataService } from '../data.service';
import { retry, catchError } from 'rxjs/operators';
import { ErrorComponent } from '../error/error.component';
import { throwError } from 'rxjs';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Login } from '../Login';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {
  userEmail: string="";
  userPassword: string="";
  buttonLabel: string="Login";
  authRequest:any={
    "userName":"sudhanshu",
    "password":"password"
  };
  

  constructor(public service: DataService, private router: Router, private httpClient: HttpClient, private dialog: MatDialog) { }
  ngOnInit() {  }


signIn() {
  let resp=this.service.generateToken(this.authRequest);
  resp.subscribe(data=>this.login2(data));
  
}
login2(token)
{
  
    
    this.service.login(this.userEmail,this.userPassword,"mac",token).pipe(retry(1), catchError((error: HttpErrorResponse) => {
      this.dialog.open(ErrorComponent, {
        data: {
          message: error.error,
        }
      });

      return throwError('Error Loging in');
    })).subscribe((login: Login) => {
      this.router.navigate(["/mac/viewCourses"]);
      this.service.userName=login.userName;
    })
  
}
}