import { Component, OnInit ,Inject} from '@angular/core';
import { Register } from '../register/register';
import { Router, ActivatedRoute } from '@angular/router';
import { RegisterService } from '../register/register.service';
import { WebStorageService, LOCAL_STORAGE } from 'angular-webstorage-service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  fname: string;
  constructor(private router:Router) { }
  Navigations=[
  {path:"/main" ,label:"Home"},
  {path:"/login" ,label:"Login"},
  {path:"/register" ,label:"Register"},
  {path:"/about" ,label:"About"},
  {path:"/contact" ,label:"Contact"}
  ]
  ngOnInit() {
    this.fname= localStorage.getItem('firstname');
  }
 
  Logout(){
    localStorage.removeItem('firstname');
    this.router.navigate(['/main']);
   }
}
