import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ProgramsOffered } from '../ProgramsOffered';
import { retry, catchError } from 'rxjs/operators';
import { HttpErrorResponse } from '@angular/common/http';
import { throwError } from 'rxjs';

@Component({
  selector: 'app-addcourse',
  templateUrl: './addcourse.component.html',
  styleUrls: ['./addcourse.component.css']
})
export class AddcourseComponent implements OnInit {

  array: ProgramsOffered[] = [];
  postdata: ProgramsOffered;
  spresp: any = [];
  success: boolean = false;
  message: string;
  eligible: any[] = ["HSC", "SSC", "Graduation"];
  constructor(public service: DataService, public router: Router) { }

  ngOnInit(): void {
    // this.array=this.view.courses;
    this.service.getCourses().subscribe((data: any) => {
      this.array = data;
    }
    )
  }
  programsOfferedForm = new FormGroup({
    id: new FormControl,
    programName: new FormControl('', [Validators.required, Validators.pattern(/^[A-Z]{1}[a-zA-Z0-9:,.\s-]{0,}$/)]),
    applicantEligibility: new FormControl('', [Validators.required]),
    description: new FormControl('', [Validators.required, Validators.pattern(/^[A-Z]{1}[a-zA-Z0-9:,.\s-]{0,}$/), Validators.maxLength(20)]),
    duration: new FormControl('', [Validators.required, Validators.pattern(/^[2-4]{1}$/)]),
    degreeCertificateOffered: new FormControl('', [Validators.required, Validators.pattern(/^[A-Z]{1}[a-zA-Z0-9:,.\s-]{0,}$/)])
  })

  onSubmit() {
    if (this.programsOfferedForm.valid) {
      let id = this.array[this.array.length - 1].courseId + 1;
      this.postdata = new ProgramsOffered(id, this.programsOfferedForm.get("programName").value, this.programsOfferedForm.get("description").value, this.programsOfferedForm.get("applicantEligibility").value, this.programsOfferedForm.get("duration").value, this.programsOfferedForm.get("degreeCertificateOffered").value);
      this.service.addprogramOffered(this.postdata).pipe(retry(1), catchError((error: HttpErrorResponse) => {
        this.router.navigate(["showerror",error.error]);
        return throwError('Error fetching data from serve');
      })).subscribe(resp => {
        this.success = true;
        this.message = "Course is added successfully and make sure you added the Schedule for the same Course";
      })
    }
  }

  logout() {
    this.router.navigateByUrl("courses");
  }
}
