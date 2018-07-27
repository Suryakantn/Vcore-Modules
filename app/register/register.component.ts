import { Component, OnInit } from '@angular/core';
import { Register } from './register';
import { RegisterService } from './register.service';
import { first } from 'rxjs/operators';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
user:any={}
register:Register[];
errormessage:string=" ";
  constructor(private registerService:RegisterService,private router:Router) { }

  ngOnInit() {
  }

onSubmit(){
  if(this.user.firstname != "" || this.user.lastname != "" || this.user.email != "" ||
  this.user.gender != "" || this.user.mobile != ""){
    console.log(this.user);
    this.registerService.register(this.user) 
    .pipe(first())
    .subscribe((data) => {
      alert(data.success)
     this.router.navigate(['/login']);
     //this.errormessage="You have been registered..Check your email";
  });
  }
  else{
    this.errormessage="Enter All fields";
  }
  
}
oncheckEmail(){
  console.log(this.user.email);
  this.registerService.checkEmail(this.user) 
  .pipe(first())
  .subscribe((data) => {
    if(data.code=="100") {
      this.router.navigate(['/register']);
      this.errormessage = data.success;
     }
     else{
      this.router.navigate(['/register']);
      this.errormessage = data.success;
     }
});
}

}
