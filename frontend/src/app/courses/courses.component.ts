import { Component, OnInit } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { ApplicantDataService } from '../applicant-data.service';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.css']
})
export class CoursesComponent implements OnInit {

  constructor(private applicantService: ApplicantDataService) { }
  courses:any[];
  errorText: string="";
  errBlock: Boolean=false;
  errorFlag:boolean=false;
  ngOnInit(): void {
    this.applicantService.getCourses().subscribe((data: any): void => {
      this.courses = data;
      this.errorFlag=true;
    }, error => {
      console.log(error.message,error.status);
      this.errBlock = true;
      this.errorText = error.error;
      this.errorFlag=true;
    });
  }
}
