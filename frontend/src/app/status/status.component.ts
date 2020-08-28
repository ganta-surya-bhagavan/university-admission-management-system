import { Component, OnInit } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { ApplicantDataService } from '../applicant-data.service';

@Component({
  selector: 'app-status',
  templateUrl: './status.component.html',
  styleUrls: ['./status.component.css']
})
export class StatusComponent implements OnInit {

  applicants:any[];
  applicationId:number;
  statusResult:string="";
  errorText: string="";
  errBlock: Boolean=false;
  dateOfInterview:string="";
  errorFlag:boolean=false;
  constructor(private applicantService: ApplicantDataService) { }

  ngOnInit(): void {
    this.applicantService.getStatus().subscribe((data: any): void => {
      this.applicants = data;
      this.errorFlag=true;
    }, error => {
      console.log(error.message,error.status);
      this.errBlock = true;
      this.errorText = error.error;
      this.errorFlag=true;
    });
  }

  checkStatus(){
    var applicationId = this.applicationId;
    var statusResult = "";
    var dateOfInterview="";
    this.applicants.forEach(function(value){
      if(value.applicantId == applicationId){
        statusResult ="applicant with Application Id "+ applicationId+" is "+value.status;
        dateOfInterview= "interview date is "+value.dateOfInterview;
      }
    });
    this.dateOfInterview=dateOfInterview;
    this.statusResult = statusResult;
    if(this.statusResult == ""){
      this.statusResult = this.applicationId+" does not exists";
    }
  }
}
