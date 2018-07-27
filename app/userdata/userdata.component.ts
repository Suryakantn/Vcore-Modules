import { Component, OnInit } from '@angular/core';
import { Register } from '../register/register';
import { RegisterService } from '../register/register.service';

@Component({
  selector: 'app-userdata',
  templateUrl: './userdata.component.html',
  styleUrls: ['./userdata.component.css']
})
export class UserdataComponent implements OnInit {
  register:Register[];
  id:string;
  constructor(private resisterService:RegisterService) { }

  ngOnInit() {
    this.id= localStorage.getItem('id');
    this.resisterService.getUserdetails(this.id).subscribe((usData)=>{
      this.register=usData;
    });
  }

}
