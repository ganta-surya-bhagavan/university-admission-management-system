import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Applicant } from '../Applicant';

import * as jsPDF from 'jspdf';
import { ApplicantDataService } from '../applicant-data.service';

@Component({
  selector: 'app-apply-course',
  templateUrl: './apply-course.component.html',
  styleUrls: ['./apply-course.component.css']
})
export class ApplyCourseComponent implements OnInit {
  localUrl="http://localhost:8081/applicant";
  addedApplicant:Applicant;
  targetCourse:number;
  courses:any[];
  qualification:string[]=[];
  errorMsg:string="";
  successMsg:string="";
  addedApplicantId:number;
  errorText: string="";
  errBlock: Boolean=false;
  errorFlag:boolean=false;
  targetEligibility: string;
  targetProgram: string;
  constructor(private router: ActivatedRoute,private applicantService: ApplicantDataService) {
    if(this.router.snapshot.queryParamMap.has('id')){
      this.targetCourse = parseInt(this.router.snapshot.queryParamMap.get('id'));
    }
    if(this.router.snapshot.queryParamMap.has('eligibility')){
      this.targetEligibility = (String)(this.router.snapshot.queryParamMap.get('eligibility'));
      console.log(this.targetEligibility);
      if(this.targetEligibility == "SSC"){
        this.qualification.push("SSC");
        this.qualification.push("HSC");
        this.qualification.push("Graduation");
        this.qualification.push("PostGraduation");
        this.qualification.push("Phd");
      }
      if(this.targetEligibility == "HSC"){
        //this.qualification.push("SSC");
        this.qualification.push("HSC");
        this.qualification.push("Graduation");
        this.qualification.push("PostGraduation");
        this.qualification.push("Phd");
      }
      if(this.targetEligibility == "Graduation"){
        //this.qualification.push("SSC");
        //this.qualification.push("HSC");
        this.qualification.push("Graduation");
        this.qualification.push("PostGraduation");
        this.qualification.push("Phd");
      }
      if(this.targetEligibility == "PostGraduation"){
        //this.qualification.push("SSC");
        //this.qualification.push("HSC");
        //this.qualification.push("Graduation");
        this.qualification.push("PostGraduation");
        this.qualification.push("Phd");
      }
    }

  }
  

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
     applicantForm = new FormGroup({
    fullName :new FormControl('',[Validators.required, Validators.pattern("^[A-Z]+(([a-zA-Z ])?[a-zA-Z]*)*$")]),
    qualification : new FormControl(Validators.required),
    marksObtained : new FormControl('',[Validators.required,Validators.min(40),Validators.max(100)]),
    emailId : new FormControl('',[Validators.required,Validators.pattern("^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$")]),
    dateofBirth : new FormControl('',Validators.required),
    goals : new FormControl('',Validators.required)
  });
  
  apply(){
    const applicant = new Applicant();
    applicant.dateOfBirth=this.formatDate(this.applicantForm.value.dateofBirth);
    applicant.fullName=this.applicantForm.value.fullName;
    applicant.highestQualification=this.applicantForm.value.qualification;
    applicant.emailId=this.applicantForm.value.emailId;
    applicant.marksObtained=this.applicantForm.value.marksObtained;
    applicant.scheduledProgramId=this.targetCourse;
    applicant.dateOfInterview="not yet scheduled";
    applicant.status="waiting";
    applicant.goals=this.applicantForm.value.goals;
    this.errorMsg = "";
    this.successMsg = "";
    if(applicant.dateOfBirth=="" || applicant.emailId=="" || applicant.highestQualification=="" || applicant.fullName=="" || applicant.marksObtained==null || applicant.goals==""){
      this.errorMsg = "All the fields are Mandatory";
    }
    else{
      
       this.applicantService.addApplicant(applicant).subscribe(
         data=>{
           this.addedApplicant=data;
           this.afterApply(this.addedApplicant);
         }, error => {
          this.errBlock = true;
          this.errorText = error.message;
        }
       );
      }
  }
  afterApply(applicant:Applicant){
    console.log(this.addedApplicant);
      this.successMsg = "Application Submitted with applicationId"+applicant.applicantId;
      
      this.downloadPdf(this.addedApplicant);
  }
  downloadPdf(applicant:Applicant){
    const doc = new jsPDF();
    doc.setFontSize(16);
    doc.setTextColor(255,0,0);
    doc.setFontType("bold");
    doc.text("Application Form",20,20);
    doc.setTextColor(0,0,0);
    doc.setFontSize(14);
    doc.text("Applicant Id",30,30);
    doc.text(applicant.applicantId.toString(),90,30);
    doc.rect(30,32,90,0.5);
    doc.text("Full name",30,40);
    doc.text(applicant.fullName.toString(),90,40);
    doc.rect(30,42,90,0.5);
    doc.text("Date of birth",30,50);
    doc.text(applicant.dateOfBirth.toString(),90,50);
    doc.rect(30,52,90,0.5);
    doc.text("Highest Qualification",30,60);
    doc.text(applicant.highestQualification.toString(),90,60);
    doc.rect(30,62,90,0.5);
    doc.text("Marks Obtained ",30,70);
    doc.text(applicant.marksObtained.toString(),90,70);
    doc.rect(30,72,90,0.5);
    doc.text("Goals",30,80);
    doc.text(applicant.goals.toString(),90,80);
    doc.rect(30,82,90,0.5);
    doc.text("EmailId",30,90);
    doc.text(applicant.emailId.toString(),90,90);
    doc.rect(30,92,90,0.5);
    doc.text("Program Id",30,100);
    doc.text(applicant.scheduledProgramId.toString(),90,100);
    doc.rect(30,102,90,0.5);
    doc.text("Date of interview",30,110);
    doc.text(applicant.dateOfInterview.toString(),90,110);
    doc.rect(30,112,90,0.5);
    doc.text("status",30,120);
    doc.text(applicant.status.toString(),90,120);
    doc.save("applicant.pdf");
    this.applicantForm.reset;
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

}
