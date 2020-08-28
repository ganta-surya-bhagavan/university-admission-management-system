import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from './data.service';
import { ProgramsOffered } from './ProgramsOffered';
import { ProgramsScheduled } from './ProgramsScheduled';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'UniversityAdmission';
  scheduledCourses:ProgramsScheduled[]=[];
  course:ProgramsOffered[]=[];
  constructor(private router:Router,private service:DataService)
  {
   
  }
  ngOnInit(): void {
    this.getScheduledCourses();
    this.getCourse();
    this.router.navigate(['courses']);
  }
  getScheduledCourses()
  {
    return this.service.getCourseSchedule().subscribe((data:any)=>{
      this.scheduledCourses=data;
    }
    )
  }
 
  getCourse()
  {
    return  this.service.getCourses().subscribe((data:any)=>{
      this.course=data;
    })
  }
  

 
}
