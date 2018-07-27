import { Injectable } from '@angular/core';
import { Register } from './register';
import {Http,Headers,Response} from '@angular/http';
import { Observable, Subject, asapScheduler, pipe, of, from, interval, merge, fromEvent } from 'rxjs';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  constructor(private http:Http) { }

  register(user: Register) {
    var headers = new Headers();
    headers.append("Content-Type","application/json")
    console.log(JSON.stringify(user));
    return this.http.post(`http://localhost:3000/register/insert`, user,{headers:headers})
    .map((response:Response) =>response.json());
}
  createPassword(user){
    var headers = new Headers();
    headers.append("Content-Type","application/json")
    console.log(JSON.stringify(user));
    return this.http.post(`http://localhost:3000/register/createpass`, user,{headers:headers})
    .map((response:Response) =>response.json());
  }
  login(user:Register) {
    var headers = new Headers();
    headers.append("Content-Type","application/json")
    console.log(JSON.stringify(user));
    return this.http.post(`http://localhost:3000/login`, user,{headers:headers})
    .map((response:Response) =>response.json());
}

checkEmail(user){
  var headers = new Headers();
  headers.append("Content-Type","application/json")
  console.log(JSON.stringify(user));
  return this.http.post(`http://localhost:3000/register/checkemail`, user,{headers:headers})
  .map((response:Response) =>response.json());
}
getUserdetails(id){
  return this.http.get("http://localhost:3000/user/get/"+id)
  .map((response:Response) => <Register[]>response.json())
}
showleftTabs(){
  return this.http.get("http://localhost:3000/tabs/")
  .map((response:Response) => response.json());
}
showsubTab(){
  return this.http.get("http://localhost:3000/subtabs/")
  .map((response:Response) => response.json());
}
}
