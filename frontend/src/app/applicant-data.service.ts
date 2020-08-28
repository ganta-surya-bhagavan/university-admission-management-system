import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Applicant } from './Applicant';

import { ProgramsOffered } from './ProgramsOffered';
import { ProgramsScheduled } from './ProgramsScheduled';

@Injectable({
  providedIn: 'root'
})
export class ApplicantDataService {

  constructor(private httpClient: HttpClient) { }

  getCourses():Observable<ProgramsOffered>{
    return this.httpClient.get<ProgramsOffered>('http://localhost:8080/courseList');
  }
  getSchedules():Observable<ProgramsScheduled>{
    return this.httpClient.get<ProgramsScheduled>('http://localhost:8082/scheduleList');
  }
  getStatus():Observable<Applicant>{
    return this.httpClient.get<Applicant>('http://localhost:8081/applicantList');
  }
  addApplicant(applicant:Applicant):Observable<Applicant>{
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    return this.httpClient.post<Applicant>('http://localhost:8081/applicant', applicant, httpOptions);
  }
}
