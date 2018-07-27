import { Component, OnInit } from '@angular/core';
import { RegisterService } from '../register/register.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-xmldata',
  templateUrl: './xmldata.component.html',
  styleUrls: ['./xmldata.component.css']
})
export class XmldataComponent implements OnInit {
  user: [
    {
        id:string,
        name:string
    }
    ];
  constructor(private router:Router,private resisterService:RegisterService) { }

  ngOnInit() {
    this.resisterService.showsubTab().subscribe((usData)=>{
      this.user=usData;
    });
  }
  
}
