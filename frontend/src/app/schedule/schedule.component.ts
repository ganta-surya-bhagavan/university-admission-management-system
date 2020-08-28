import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from "@angular/common/http";
import { ApplicantDataService } from '../applicant-data.service';

@Component({
  selector: 'app-schedule',
  templateUrl: './schedule.component.html',
  styleUrls: ['./schedule.component.css']
})
export class ScheduleComponent implements OnInit {
  targetCourse:number;
  details:any[];
  errorText: string="";
  errBlock: Boolean=false;
  errorFlag:boolean=false;
  constructor(private router: ActivatedRoute,private applicantService: ApplicantDataService) {
    if(this.router.snapshot.queryParamMap.has('id')){
      this.targetCourse = parseInt(this.router.snapshot.queryParamMap.get('id'));
    }
  }

  ngOnInit(): void {
    this.applicantService.getSchedules().subscribe((data: any): void => {
      this.details = data;
      this.errorFlag=true;
    }, error => {
      console.log(error.message,error.status);
      this.errBlock = true;
      this.errorText = error.error;
      this.errorFlag=true;
    });
  }
}
