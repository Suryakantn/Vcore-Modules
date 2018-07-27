import { Component, OnInit } from '@angular/core';
import { Registers } from '../usermanage/registers';
import { UserroleService } from '../usermanage/userrole.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.component.html',
  styleUrls: ['./tabs.component.css']
})
export class TabsComponent implements OnInit {
  navLinks = [
    {path: "/tabs/groupmodules/searchbox",},
    {path: "/tabs/user/role",},
    {path: "/tabs/googlemap",},
    {path: "/tabs/profile/userdata",},

  ];
  public link: any={};
  user:Registers; 
  constructor(private usermanage:UserroleService,private router: Router) { }
 
 
  ngOnInit() {
    this.searchData1();
  }
  searchData1()
  {
    this.usermanage.getTabsData(this.user).subscribe((data1) =>{
      if(data1[0].code==400){
       
      }else if(data1[0].code==200){
     
        var mydata;
     
        var userData=data1[1];
         this.user=userData;
          
        }
    })

  }
}
