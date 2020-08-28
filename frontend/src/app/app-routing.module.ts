import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddscheduleComponent } from './addschedule/addschedule.component';
import {AddcourseComponent} from './addcourse/addcourse.component';
import { LoginComponent } from './login/login.component';
import { ViewcourseComponent } from './viewcourse/viewcourse.component';
import { ViewscheduleComponent } from './viewschedule/viewschedule.component';
import { ViewapplicantComponent } from './viewapplicant/viewapplicant.component';
import { ErrorComponent } from './error/error.component';
import { ShowErrorComponent } from './show-error/show-error.component';
import { CreateMacComponent } from './create-mac/create-mac.component';

import { ScheduleComponent } from './schedule/schedule.component';
import { StatusComponent } from './status/status.component';
import { CoursesComponent } from './courses/courses.component';
import { ApplyCourseComponent } from './apply-course/apply-course.component';
import { AuthComponent } from './auth/auth.component';
import { MacComponent } from './mac/mac.component';
import { ViewCoursesComponent } from './mac/view-courses/view-courses.component';
import { ApplicantsComponent } from './mac/applicants/applicants.component';
import { ViewScheduleComponent } from './mac/view-schedule/view-schedule.component';






const routes: Routes = [];

@NgModule({
  imports: [RouterModule.forRoot([
    {
      
        path:'addc',component:AddcourseComponent},
        {
          path:'adds',component:AddscheduleComponent},
          {path:'login',component:LoginComponent},
          {path:'viewc',component:ViewcourseComponent},
          {path:'views',component:ViewscheduleComponent},
         
          {path:'viewa',component:ViewapplicantComponent},
          {path:'error',component:ErrorComponent},
          {path:'create',component:CreateMacComponent},
          {path:'showerror/:errMsg',component:ShowErrorComponent},
          {path: '', pathMatch: 'full', redirectTo: 'courses'},
          {path: 'courses', component: CoursesComponent },
          {path: 'schedules', component: ScheduleComponent },
          {path: 'applyCourse', component: ApplyCourseComponent },
          {path: 'status', component: StatusComponent },
          {path: '', pathMatch: 'full', redirectTo: 'auth'},
          {path: 'auth', component: AuthComponent },
          {path: 'mac', component: MacComponent,children:[
            {path: 'viewCourses', component: ViewCoursesComponent},
            {path: 'applicants', component: ApplicantsComponent},
            {path: 'viewSchedule/:id', component: ViewScheduleComponent}
          ] }
        
  ])],
  exports: [RouterModule]
})
export class AppRoutingModule { }
