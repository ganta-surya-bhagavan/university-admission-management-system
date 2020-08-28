import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Login } from '../Login';
import { retry, catchError } from 'rxjs/operators';
import { HttpErrorResponse } from '@angular/common/http';
import { throwError } from 'rxjs';

@Component({
  selector: 'app-create-mac',
  templateUrl: './create-mac.component.html',
  styleUrls: ['./create-mac.component.css']
})
export class CreateMacComponent implements OnInit {
  postdata:Login;
  message:any;
  success:boolean=false;
  authRequest:any={
    "userName":"sudhanshu",
    "password":"password"
  };
  constructor(public service:DataService,private router:Router) { }

  ngOnInit(): void {
  }

  userForm = new FormGroup({
    userName: new FormControl('', [Validators.required,Validators.minLength(5)]),
    password: new FormControl('', [Validators.required,Validators.minLength(5)]),
    role: new FormControl('', [Validators.required])
  })


  logout()
  {
    this.router.navigateByUrl("courses");
  }

  onSubmit() {
    let resp=this.service.generateToken(this.authRequest);
    resp.subscribe(data=>this.onSubmit1(data));
    
  }
  onSubmit1(token)
{
  if (this.userForm.valid) {
    this.postdata= new Login(this.userForm.get("userName").value, this.userForm.get("password").value, this.userForm.get("role").value);
    this.service.createNewMac(this.postdata,token).pipe(retry(1), catchError((error: HttpErrorResponse) => {
      this.success=true;
      this.message=error.error;
      return throwError('UserName already exist');
    })).subscribe(resp => {
      this.success = true;
      this.message = "MAC is created Successfully";
    })
  }
}

}
