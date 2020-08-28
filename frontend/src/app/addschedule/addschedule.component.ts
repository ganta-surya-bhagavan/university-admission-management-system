import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Applicant } from '../Applicant';
import { AppComponent } from '../app.component';
import { ProgramsScheduled } from '../ProgramsScheduled';
import { retry, catchError } from 'rxjs/operators';
import { HttpErrorResponse } from '@angular/common/http';
import { throwError } from 'rxjs';

@Component({
  selector: 'app-addschedule',
  templateUrl: './addschedule.component.html',
  styleUrls: ['./addschedule.component.css']
})
export class AddscheduleComponent implements OnInit {

  array: ProgramsScheduled[] = [];
  postdata: ProgramsScheduled;
  spresp: any = [];
  success: boolean = false;
  message: string;
  remain: any = [];
  count: any;
  minDate = new Date(2020, 6, 1);
  minDate1=new Date(2022,6,1);
  
  constructor(public service: DataService, private router: Router, public app: AppComponent) {

  }

  ngOnInit(): void {

    this.getCommon();

  }


  getCommon() {
    this.service.getAvailableProgramName().pipe(retry(1), catchError((error: HttpErrorResponse) => {
      alert(error.error);
      this.router.navigateByUrl("viewc")
      return throwError('Error fetching data from serve');
    })).subscribe(data => {
      this.remain=data;
      this.programsScheduledForm.controls["programName"].setValue(this.remain[0]);
    })
    this.getScheduledCourse();
  }


  programsScheduledForm = new FormGroup({
    id: new FormControl,
    programName: new FormControl('', [Validators.required]),
    location: new FormControl('', [Validators.required, Validators.pattern(/^[A-Z]{1}[a-zA-Z0-9:,.\s-]{0,}$/)]),
    startDate: new FormControl('', [Validators.required]),
    endDate: new FormControl('', [Validators.required]),
    sessionsPerWeek: new FormControl('', [Validators.required, Validators.pattern(/^[5-7]$/)])
  })

  logout() {
    this.router.navigateByUrl("courses");
  }

  getScheduledCourse() {
    this.service.getCourseSchedule().subscribe((data: any) => {
      this.array = data;
    })
  }

  onSubmit() {
    if (this.programsScheduledForm.valid) {
      let id = this.array[this.array.length - 1].scheduledProgramId + 1;
      this.postdata = new ProgramsScheduled(id, this.programsScheduledForm.get("programName").value, this.programsScheduledForm.get("location").value, this.programsScheduledForm.get("startDate").value.toLocaleDateString(), this.programsScheduledForm.get("endDate").value.toLocaleDateString(), this.programsScheduledForm.get("sessionsPerWeek").value);
      console.log(this.postdata);
      this.service.addprogramScheduled(this.postdata).subscribe(resp => {
        this.success = true;
        this.message = "Schedule is added successfully";
        this.router.navigateByUrl("/views");
      })
    }
  }
}
