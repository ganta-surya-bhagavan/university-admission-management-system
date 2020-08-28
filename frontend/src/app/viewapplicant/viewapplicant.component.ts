import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { Applicant } from '../Applicant';
import { Router, ActivatedRoute } from '@angular/router';
import { FormControl, Validators } from '@angular/forms';
import { empty, throwError } from 'rxjs';
import { ProgramsOffered } from '../ProgramsOffered';
import { retry, catchError } from 'rxjs/operators';
import { HttpErrorResponse } from '@angular/common/http';


@Component({
  selector: 'app-viewapplicant',
  templateUrl: './viewapplicant.component.html',
  styleUrls: ['./viewapplicant.component.css']
})
export class ViewapplicantComponent implements OnInit {
  course: ProgramsOffered[] = [];
  applicants: Applicant[] = [];
  showTable: boolean = false;
  showMsg: boolean = false;
  message: string;
  constructor(public service: DataService, public router: Router) { }
  msg:any;
  ngOnInit(): void {
    
    this.getCourse();


  }
  searchFilter = new FormControl('', Validators.required);
  getCourse() {
    console.log(this.service.userName);
    return this.service.getCourses().subscribe((data: any) => {
      this.course = data;
    })
    
  }



  logout() {
    this.router.navigateByUrl("courses");
  }


  applySearchFilter() {
    if (this.searchFilter.valid) {
      this.showMsg = false;
      this.showTable = false;
      this.service.getApplicantsByProgramName(this.searchFilter.value.programName).pipe(retry(1), catchError((error: HttpErrorResponse) => {
        this.message = error.error;
        this.showMsg = true;
        return throwError('Error fetching data from serve');
      })).subscribe((data: any) => {
        this.applicants = data;
        this.showTable = true;
      });
    }
  }

}
