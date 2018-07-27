import { Component, OnInit } from '@angular/core';
import { UserroleService } from '../userrole.service';

@Component({
  selector: 'app-role',
  templateUrl: './role.component.html',
  styleUrls: ['./role.component.css']
})
export class RoleComponent implements OnInit {
  public register = [];
  user: any = {}
  id: number;
  constructor(private usermanage:UserroleService) { }

  ngOnInit() {
  }
  insertRole()
  {
    
    this.usermanage.insertRoleData(this.user)
    .subscribe(response=>{
      console.log("response===>",JSON.stringify(response))
       let res=JSON.stringify(response);
       alert("insert role data"+res);
      // console.log(response.message)
      // if(response.message=="sucess"){
      //   this.registerService.getRegister('get')
      // }
    });
  }
}
