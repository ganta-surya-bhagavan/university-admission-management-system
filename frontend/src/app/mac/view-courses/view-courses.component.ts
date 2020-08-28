import { Component, OnInit } from '@angular/core';
import { MacService } from "../../mac.service";

@Component({
  selector: 'app-view-courses',
  templateUrl: './view-courses.component.html',
  styleUrls: ['./view-courses.component.css']
})
export class ViewCoursesComponent implements OnInit {

  courses:any[]=[];
  constructor(private macService: MacService) {

  }

  ngOnInit(): void {
    this.courses=this.macService.loadProgramsOffered();
  }
}
