import { Component, OnInit } from '@angular/core';
import { Registers } from '../registers';
import { Router } from '@angular/router';
import { UserroleService } from '../userrole.service';

@Component({
  selector: 'app-submenues',
  templateUrl: './submenues.component.html',
  styleUrls: ['./submenues.component.css']
})
export class SubmenuesComponent implements OnInit {
  user:Registers;
  constructor(private router: Router,private usermanage:UserroleService) { }

  ngOnInit() {
    this.showSubMenusData();
  }

  showSubMenusData()
  {
    this.usermanage.showSubMenus(this.user).subscribe((data1) =>{

      if(data1[0].code==400){
       
      }else if(data1[0].code==200 ){
     
        var mydata;
     
        var userData=data1[1];
       
         this.user=userData;
           var perimisionData=data1[2];

   
           console.log("array data"+data1);
  
     

        }
    })

  }

}
