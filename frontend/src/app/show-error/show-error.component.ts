import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-show-error',
  templateUrl: './show-error.component.html',
  styleUrls: ['./show-error.component.css']
})
export class ShowErrorComponent implements OnInit {

  constructor(private actrouter:ActivatedRoute,private router:Router) { }
  errMsg:any;
  ngOnInit(): void {
   this.errMsg=this.actrouter.snapshot.paramMap.get('errMsg');
    
  }
  logout()
  {
    this.router.navigateByUrl("courses");
  }

}
