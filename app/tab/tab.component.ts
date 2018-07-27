import { Component, OnInit } from '@angular/core';
import { RegisterService } from '../register/register.service';

@Component({
  selector: 'app-tab',
  templateUrl: './tab.component.html',
  styleUrls: ['./tab.component.css']
})
 
export class TabComponent implements OnInit {
  leftmenue: [
    {
        tabname:string,
        path:string
    }
    ];
    navLinks = [
      {path: "/home1",},
      {path: "/user",},
      {path: "register",},
      {path: "login",},
      {path: "profile",}, 
    ];
    public groplink: [
      { path: 'searchbox', tabname: 'Searchbox' },
      { path: 'creategroup', tabname: 'Creategroup'  }
    ] 
    glink:any={}
  constructor(private registerService:RegisterService) { }
  
  ngOnInit() {
    this.showleftTabs();
    this.glink=this.groplink;
  }
  showleftTabs(){
    this.registerService.showleftTabs().subscribe((data) =>{
      this.leftmenue=data;
    });
  }
 
}
