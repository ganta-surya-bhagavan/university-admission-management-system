import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MacService } from "../../mac.service";

@Component({
  selector: 'app-view-schedule',
  templateUrl: './view-schedule.component.html',
  styleUrls: ['./view-schedule.component.css']
})
export class ViewScheduleComponent implements OnInit {

  targetId:number;
  schedules:any[]=[];
  constructor(private router: ActivatedRoute,private macService: MacService) {
    this.router.params.subscribe( params => this.targetId = params['id']);
  }

  ngOnInit(): void {
    this.schedules=this.macService.loadProgramsScheduled();
  }
}
