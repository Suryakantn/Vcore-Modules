import { Component, OnInit } from '@angular/core';
import { Register } from '../register/register';
import { RegisterService } from '../register/register.service';
import { Router } from '@angular/router';
import { first } from 'rxjs/operators';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  user:any={}
  register:Register[];
  errormessage:string=" ";
  constructor(private registerService:RegisterService,private router:Router) { }

  ngOnInit() {
  }

  onSubmit(){
    if(this.user.email != "" && this.user.password != ""){
    console.log(this.user);
    console.log("email",this.user.email);
    console.log("password",this.user.password);
    this.registerService.login(this.user)
    .subscribe((userdata) =>
   { 
    if(userdata.code=="200") {
      var id=userdata.userid;
      var firstname=userdata.firstname;
     localStorage.setItem('firstname',firstname);
     localStorage.setItem('id',id);
    this.router.navigate(['']);
      alert(userdata.success+" " + userdata.firstname);
   }
   else if(userdata.code=="300"){
    this.router.navigate(['/login']);
    this.errormessage = userdata.success;
   }
   else{
    this.router.navigate(['/login']);
    this.errormessage = userdata.success;
   }
  });
  }
  else{
    this.router.navigate(['/login']);
    this.errormessage = "Enter User name and password";
  }
  }
 
}
