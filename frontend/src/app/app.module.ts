import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { AddcourseComponent } from './addcourse/addcourse.component';
import { AddscheduleComponent } from './addschedule/addschedule.component';
import {HttpClient, HttpClientModule} from '@angular/common/http';
import { DataService } from './data.service';
import {ReactiveFormsModule,FormsModule} from '@angular/forms';
import { ViewcourseComponent } from './viewcourse/viewcourse.component';
import { ViewscheduleComponent } from './viewschedule/viewschedule.component';
import { ViewapplicantComponent } from './viewapplicant/viewapplicant.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatListModule } from '@angular/material/list';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ErrorComponent } from './error/error.component';
import { MatDialogModule } from '@angular/material/dialog';
import { ShowErrorComponent } from './show-error/show-error.component';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { CreateMacComponent } from './create-mac/create-mac.component';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatNativeDateModule} from '@angular/material/core';

import { ScheduleComponent } from './schedule/schedule.component';
import { StatusComponent } from './status/status.component';
import { CoursesComponent } from './courses/courses.component';
import { ApplyCourseComponent } from './apply-course/apply-course.component';
import { ApplicantDataService } from './applicant-data.service';


import { AuthComponent } from './auth/auth.component';
import { MacComponent } from './mac/mac.component';
import { ViewCoursesComponent } from './mac/view-courses/view-courses.component';
import { ApplicantsComponent } from './mac/applicants/applicants.component';
import { ViewScheduleComponent } from './mac/view-schedule/view-schedule.component';






@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    AddcourseComponent,
    AddscheduleComponent,
    ViewcourseComponent,
    ViewscheduleComponent,
    ViewapplicantComponent,
    ErrorComponent,
    ShowErrorComponent,
    CreateMacComponent,
    ScheduleComponent,
    StatusComponent,
    CoursesComponent,
    ApplyCourseComponent,
    AuthComponent,
    MacComponent,
    ViewCoursesComponent,
    ApplicantsComponent,
    ViewScheduleComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    MatButtonModule,
    FlexLayoutModule,
    MatFormFieldModule,
    MatInputModule,
    MatListModule,
    MatSelectModule,
    BrowserAnimationsModule,
    MatDialogModule,
    MatTableModule,
    MatPaginatorModule,
    MatDatepickerModule,
    MatNativeDateModule
  ],
  providers: [DataService,ApplicantDataService],
  bootstrap: [AppComponent]
  
})
export class AppModule { }
