import { Component, OnInit, ViewChild } from '@angular/core';
import { DataService } from '../data.service';
import { Router } from '@angular/router';
import { Applicant } from '../Applicant';
import { ProgramsOffered } from '../ProgramsOffered';
import { retry, catchError } from 'rxjs/operators';
import { HttpErrorResponse } from '@angular/common/http';
import { throwError } from 'rxjs';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-viewcourse',
  templateUrl: './viewcourse.component.html',
  styleUrls: ['./viewcourse.component.css']
})
export class ViewcourseComponent implements OnInit {
  courses: ProgramsOffered[] = [];
  applicant: Applicant[] = [];
  wait: any = 0;
  accept: any;
  reject: any;
  showInfo: boolean = false;
  showFail: boolean = false;
  programName: any;
  total: any;
  showSuccess: boolean = false;
  message: string;


  constructor(public service: DataService, public router: Router) { }

  ngOnInit(): void {
    this.getCourses();
    this.getApplicant();

  }
  getCourses() {
    return this.service.getCourses().subscribe((data: any) => {
      this.courses = data;
    }
    )
  }
  getApplicant() {
    return this.service.getApplicant().subscribe((data: any) => {
      this.applicant = data;
    }
    )
  }

  onRemove(id: any, programName: any) {
    this.showInfo = false;
    this.service.deleteCourses(id).pipe(retry(1), catchError((error: HttpErrorResponse) => {
      this.message = error.error;
      this.showFail = true;
      this.showSuccess = false;
      return throwError('Error fetching data from serve');
    })).subscribe(resp => {
      for (let i = 0; i < this.courses.length; i++) {
        if (this.courses[i].courseId == id) {
          this.courses.splice(i, 1);
        }
      }
      this.showSuccess = true;
      this.showFail = false;
      this.message = programName + " deleted successfully and kindly make sure you will also delete the Schedule for " + programName;
    })

  }


  logout() {
    this.router.navigateByUrl("courses");
  }



  getInfo(id: any, programName: any) {
    this.showSuccess = false;
    this.showFail = false;
    this.accept = 0;
    this.reject = 0;
    this.wait = 0;
    this.total = 0;
    this.showInfo = true;
    for (let i = 0; i < this.applicant.length; i++) {
      this.programName = programName;

      if (id == this.applicant[i].scheduledProgramId) {
        this.total++;

        if (this.applicant[i].status == "waiting") {
          this.wait++;
        }
        else if (this.applicant[i].status == "accepted") {
          this.accept++;
        }
        else if (this.applicant[i].status == "rejected") {
          this.reject++;
        }

      }
    }

  }

}
