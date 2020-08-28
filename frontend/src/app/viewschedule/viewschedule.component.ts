import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from '../data.service';
import { ProgramsScheduled } from '../ProgramsScheduled';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Applicant } from '../Applicant';
import { retry, catchError } from 'rxjs/operators';
import { HttpErrorResponse } from '@angular/common/http';
import { throwError } from 'rxjs';


@Component({
  selector: 'app-viewschedule',
  templateUrl: './viewschedule.component.html',
  styleUrls: ['./viewschedule.component.css']
})
export class ViewscheduleComponent implements OnInit {
  scheduledCourses: ProgramsScheduled[] = [];
  showSuccess: boolean = false;
  message: string;
  showForm: boolean = false;
  scheduledid: any;
  postdata: ProgramsScheduled;
  applicant: Applicant[] = [];
  count: any = 0;
  minDate = new Date(2020, 6, 1);
  minDate1=new Date(2022,6,1);
  constructor(public service: DataService, public router: Router) { }

  ngOnInit(): void {
    this.getScheduledCourses();
    this.getApplicant();
  }
  programsScheduledForm = new FormGroup({
    id: new FormControl,
    programName: new FormControl('', [Validators.required]),
    location: new FormControl('', [Validators.required, Validators.pattern(/^[A-Z]{1}[a-zA-Z0-9:,.\s-]{0,}$/)]),
    startDate: new FormControl('', [Validators.required]),
    endDate: new FormControl('', [Validators.required,]),
    sessionsPerWeek: new FormControl('', [Validators.required, Validators.pattern(/^[5-7]$/)])
  })
  getScheduledCourses() {
    return this.service.getCourseSchedule().subscribe((data: any) => {
      this.scheduledCourses = data;
    }
    )
  }

  getApplicant() {
    return this.service.getApplicant().subscribe((data: any) => {
      this.applicant = data;
    }
    )
  }

  onRemove1(id: any, programName: any) {
    this.showForm = false;
    this.service.deleteScheduledCourse(id).pipe(retry(1), catchError((error: HttpErrorResponse) => {
      this.message = error.error;
      this.showSuccess = true;
      return throwError('Error fetching data from serve');
    })).subscribe(resp => {
      for (let i = 0; i < this.scheduledCourses.length; i++) {
        if (this.scheduledCourses[i].scheduledProgramId == id) {
          this.scheduledCourses.splice(i, 1);
        }
      }
      this.showSuccess = true;
      this.showForm = false;
      this.message = programName + " Schedule is deleted successfully";
    })

  }


  logout() {
    this.router.navigateByUrl("courses");
  }


  onUpdate(id: any, programName: any) {
    this.showSuccess = false;
    this.showForm = true;
    this.scheduledid = id;
    this.programsScheduledForm.controls["programName"].setValue(programName);
  }

  onSubmit() {
    if (this.programsScheduledForm.valid) {

      this.postdata = new ProgramsScheduled(this.scheduledid, this.programsScheduledForm.get("programName").value, this.programsScheduledForm.get("location").value, this.programsScheduledForm.get("startDate").value.toLocaleDateString(), this.programsScheduledForm.get("endDate").value.toLocaleDateString(),  this.programsScheduledForm.get("sessionsPerWeek").value);
      this.service.updateScheduled(this.postdata).pipe(retry(1), catchError((error: HttpErrorResponse) => {
        this.router.navigate(["showerror", error.error]);
        return throwError('Error fetching data from serve');
      })).subscribe(data => {
        alert("Schedule Updated Successfully");
        this.router.navigateByUrl("viewc");
      })
    }
  }
}
