import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { ProgramsOffered } from "./ProgramsOffered";
import { ProgramsScheduled } from "./ProgramsScheduled";
import { Applicant } from "./Applicant";

@Injectable({
  providedIn: 'root'
})
export class MacService {
  constructor(private httpClient: HttpClient) { }

  loadProgramsOffered(){
    let programsOfferedDatabase:any[]=[];
    this.httpClient.get<ProgramsOffered[]>("http://localhost:8080/courseList").subscribe(response => {
      for(const Program of(response as any)){
        programsOfferedDatabase.push({
          courseId:Program.courseId,
          programName:Program.programName,
          description:Program.description,
          applicantEligibility:Program.applicantEligibility,
          duration:Program.duration,
          degreeCertificateOffered:Program.degreeCertificateOffered
        });
      }
    }, error =>{
      console.log(error.message,error.status);
    });
    return programsOfferedDatabase;
  }

  loadProgramsScheduled(){
    let programsScheduledDatabase:any[]=[];
    this.httpClient.get<ProgramsScheduled[]>("http://localhost:8082/scheduleList").subscribe(response => {
      for(const Program of(response as any)){
        programsScheduledDatabase.push({
          scheduledProgramId:Program.scheduledProgramId,
          programName:Program.programName,
          location:Program.location,
          startDate:Program.startDate,
          endDate:Program.endDate,
          sessionsPerWeek:Program.sessionsPerWeek
        });
      }
    }, error =>{
      console.log(error.message,error.status);
    });
    return programsScheduledDatabase;
  }

  loadApplicants(){
    let applicantDatabase:any[]=[];
    this.httpClient.get<Applicant[]>("http://localhost:8081/applicantList").subscribe(response => {
      for(const applicant of(response as any)){
        applicantDatabase.push({
          applicantId:applicant.applicantId,
          fullName:applicant.fullName,
          dateOfBirth:applicant.dateOfBirth,
          highestQualification:applicant.highestQualification,
          marksObtained:applicant.marksObtained,
          goals:applicant.goals,
          emailId:applicant.emailId,
          scheduledProgramId:applicant.scheduledProgramId,
          status:applicant.status,
          dateOfInterview:applicant.dateOfInterview
        });
      }
    }, error =>{
      console.log(error.message,error.status);
    });
    return applicantDatabase;
  }

  updateApplicant(id:any,applicant:Applicant){
    return this.httpClient.put<Applicant>("http://localhost:8081/updateApplicant/"+id,applicant);
  }
}
