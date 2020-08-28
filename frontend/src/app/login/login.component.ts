import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Login } from '../Login';
import { Router } from '@angular/router';
import { ErrorComponent } from '../error/error.component';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { retry, catchError } from 'rxjs/operators';
import { HttpErrorResponse } from '@angular/common/http';
import { throwError } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  users: Login[] = [];
  authRequest:any={
    "userName":"sudhanshu",
    "password":"password"
  };
  
  constructor(public service: DataService, public router: Router, private dialog: MatDialog) { }

  ngOnInit(): void {
    this.getAccessToken(this.authRequest);

  }
  getAccessToken(authRequest){
    let resp=this.service.generateToken(authRequest);
    resp.subscribe(data=>this.getusers(data));
    
  }

  getusers(token){
    console.log(token);
    this.service.getUsers(token).subscribe((data: any): void => {
      this.users = data;
      
    }, error => {
      this.router.navigate(["showerror", 'Error fetching data from server and unable to load data from database']);
      return throwError('Error fetching data from server');
    });
  
  }

 /* getusers() {
    return this.service.getUsers().pipe(retry(1), catchError((error: HttpErrorResponse) => {
      this.router.navigate(["showerror", 'Error fetching data from server and unable to load data from database']);
      return throwError('Error fetching data from server');
    })).subscribe((data: any) => {
      this.users = data;
    }
    )
  }*/
  adminForm = new FormGroup({
    username: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
    role: new FormControl('', Validators.required)
  })

  login() {
    let resp=this.service.generateToken(this.authRequest);
    resp.subscribe(data=>this.login2(data));
    
  }
  login2(token)
  {
    console.log(token);
    if (this.adminForm.valid) {
      let userName = this.adminForm.get('username').value;
      let password = this.adminForm.get('password').value;
      let role = this.adminForm.get('role').value;
      this.service.login(userName, password, role,token).pipe(retry(1), catchError((error: HttpErrorResponse) => {
        this.dialog.open(ErrorComponent, {
          data: {
            message: error.error,
          }
        });

        return throwError('Error Loging in');
      })).subscribe((login: Login) => {
        this.router.navigateByUrl("viewa");
        this.service.userName=login.userName;
      })
    }
  }

}
