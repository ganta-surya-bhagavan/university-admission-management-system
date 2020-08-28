import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from '../data.service';

@Component({
  selector: 'app-mac',
  templateUrl: './mac.component.html',
  styleUrls: ['./mac.component.css']
})
export class MacComponent implements OnInit {

  loginUserName: string;
  constructor( private router: Router,public service:DataService) {
    this.router.navigate(["/mac/viewCourses"]);
   }

  ngOnInit(): void {

  }

  logout(){
    
    this.router.navigateByUrl('/courses');
  }

}
