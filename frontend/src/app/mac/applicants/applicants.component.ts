import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MacService } from "../../mac.service";

@Component({
  selector: 'app-applicants',
  templateUrl: './applicants.component.html',
  styleUrls: ['./applicants.component.css']
})
export class ApplicantsComponent implements OnInit {

  targetCourse = 0;
  applicants:any[]=[];
  
  constructor(private router: ActivatedRoute,private macService: MacService) {
    if(this.router.snapshot.queryParamMap.has('id')){
      this.targetCourse = parseInt(this.router.snapshot.queryParamMap.get('id'));
    }
  }

  ngOnInit(): void {
    this.applicants=this.macService.loadApplicants();
  }

  formatDate(date){
    var d = new Date(date),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();

    if (month.length < 2) 
        month = '0' + month;
    if (day.length < 2) 
        day = '0' + day;

    return [day, month, year].join('-');
  }

  scheduledInterview(indexId,applicantId,applicant){
    var date=((document.getElementById("interviewDate_"+indexId) as HTMLInputElement).value);
    if(new Date() >= new Date(date)){
      alert("Please enter the date in future");
    }
    else{
      var finalDate = this.formatDate(date);
      this.applicants[indexId].dateOfInterview = finalDate;
      applicant.dateOfInterview = finalDate;
      this.macService.updateApplicant(applicantId,applicant).subscribe(
        data=>{
          this.macService.loadApplicants();
        }
      );
      ((document.getElementById("interviewDateButton_"+indexId) as HTMLInputElement).innerHTML) = "Updated!";
    }
  }

  updateStatus(status,indexId,applicantId,applicant){
    this.applicants[indexId].status = status;
    applicant.status = status;
    this.macService.updateApplicant(applicantId,applicant).subscribe(data=>{
      this.macService.loadApplicants();
    });
  }
}
