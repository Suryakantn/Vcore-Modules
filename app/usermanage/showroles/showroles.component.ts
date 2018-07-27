import { Component, OnInit } from '@angular/core';
import { Registers } from '../registers';
import { UserroleService } from '../userrole.service';

@Component({
  selector: 'app-showroles',
  templateUrl: './showroles.component.html',
  styleUrls: ['./showroles.component.css']
})
export class ShowrolesComponent implements OnInit {
  user:Registers;
  constructor(private usermanage:UserroleService) { }

  ngOnInit() {
    this.showRolesData();
  }
  showRolesData()
  {
    this.usermanage.showRoles(this.user).subscribe((data1) =>{
      if(data1[0].code==400){
       
      }else if(data1[0].code==200){
     
        var mydata;
     
        var userData=data1[1];
         this.user=userData;
           
        }
    })

  }
}
