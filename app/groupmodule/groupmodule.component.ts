import { Component, OnInit } from '@angular/core';
import { UsergroupService } from '../Group/usergroup.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-groupmodule',
  templateUrl: './groupmodule.component.html',
  styleUrls: ['./groupmodule.component.css']
})
export class GroupmoduleComponent implements OnInit {
 
  navLinks = [
    {path: "/tabs/groupmodules/searchbox",},
    {path: "/tabs/groupmodules/creategroup",},
    {path: "/tabs/groupmodules/subgroup",},
  ];
  user:any={}
  tabid:string;
  constructor(private route:ActivatedRoute,private usergroupService:UsergroupService) { }

  ngOnInit() {
  }
  getMenu()
  {
    this.tabid = this.route.snapshot.params['tabid'];

    this.usergroupService.getMenu(this.tabid).subscribe((data1) =>{
        var userData=data1[1];
        alert(data1)
         this.user=userData;
    })

  }
}
