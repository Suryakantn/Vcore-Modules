import { Component, OnInit } from '@angular/core';
import { RegisterService } from '../register/register.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  leftmenue: [
    {
        tabname:string,
        path:string
    }
    ];
     
    glink:any={}
  constructor(private registerService:RegisterService) { }
  
  ngOnInit() {
    this.showleftTabs();
  }
  showleftTabs(){
    this.registerService.showleftTabs().subscribe((data) =>{
      this.leftmenue=data;
    });
  }
}
