import { Injectable } from '@angular/core';
import {HttpClient,HttpHeaders, HttpParams} from '@angular/common/http';
import { Observable,throwError } from 'rxjs';
import {retry,catchError} from 'rxjs/operators';
import { Login } from './Login';
import { Applicant } from './Applicant';
import { ProgramsOffered } from './ProgramsOffered';
import { ProgramsScheduled } from './ProgramsScheduled';


@Injectable({
  providedIn: 'root'
})
export class DataService {
  localurl1:string="  http://localhost:8080/courseList";
  localurl2:string=" http://localhost:8082/scheduleList";
  localurl3:string="  http://localhost:8083/userList";
  localurl4:string=" http://localhost:8081/applicantList";

 
  userName:string;
  constructor(private http:HttpClient) { }
  httpOptions={
    headers:new HttpHeaders({'Content-Type':'application/json'})
  }


  /*login(username,password,role)
  {
    return this.http.post('http://localhost:8080/userList/login',{
      "username":username,
      "password":password,
      "role":role,
    })
  }*/
  login(userName,password,role,token)
  {
    let tokenStr = 'Bearer ' + token;
    const headers = new HttpHeaders().set('Authorization', tokenStr);
    let params=new HttpParams();
    params=params.set('userName',userName);
    params=params.set('password',password);
    params=params.set('role',role);
    return this.http.get('http://localhost:8083/userList/login',{headers:headers,params:params});
  }
  getCourses():Observable<ProgramsOffered>
  {
    return this.http.get<ProgramsOffered>(this.localurl1);
  }
 
  getCourseSchedule():Observable<ProgramsScheduled>
  {
    return this.http.get<ProgramsScheduled>(this.localurl2);
    
  }
  getUsers(token):Observable<Login>

  {
    let tokenStr = 'Bearer ' + token;
    const headers = new HttpHeaders().set('Authorization', tokenStr);
    return this.http.get<Login>(this.localurl3,{headers});
  }

  getApplicant():Observable<Applicant>
  {
    return this.http.get<Applicant>(this.localurl4);
  }
  getApplicantsByProgramName(programName:String):Observable<Applicant>
  {
    return this.http.get<Applicant>(this.localurl4+"/"+programName)
  }
  getAvailableProgramName()
  {
    return this.http.get<String>('http://localhost:8082/programNameList');
  }
 

  deleteCourses(id:any):Observable<ProgramsOffered>
  {
    return this.http.delete<ProgramsOffered>(this.localurl1+"/id="+id,this.httpOptions);
  }

  deleteScheduledCourse(id:any):Observable<ProgramsScheduled>
  {
    return this.http.delete<ProgramsScheduled>(this.localurl2+"/"+id,this.httpOptions);
  }

  addprogramOffered(programsOffered:ProgramsOffered):Observable<ProgramsOffered>
  {
    return this.http.post<ProgramsOffered>(this.localurl1,programsOffered,this.httpOptions);
  }

  addprogramScheduled(programsScheduled:ProgramsScheduled):Observable<ProgramsScheduled>
  {
    return this.http.post<ProgramsScheduled>(this.localurl2,programsScheduled,this.httpOptions);
  }

  updateScheduled(schedule:ProgramsScheduled)
  {
    return this.http.put(this.localurl2+'/'+schedule.scheduledProgramId,schedule);
  }

  createNewMac(login:Login,token):Observable<Login>
  {
    let tokenStr = 'Bearer ' +token;
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': tokenStr
      })
    };
    return this.http.post<Login>(this.localurl3,login,httpOptions);
  }

  public generateToken(request) {
    return this.http.post<string>("http://localhost:8083/authenticate", request, {  responseType: 'text' as 'json' });
  }
}
