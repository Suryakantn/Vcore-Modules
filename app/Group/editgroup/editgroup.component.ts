import { Component, OnInit } from '@angular/core';
import { UsergroupService } from '../usergroup.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Usergroup } from '../usergroup';

@Component({
  selector: 'app-editgroup',
  templateUrl: './editgroup.component.html',
  styleUrls: ['./editgroup.component.css']
})
export class EditgroupComponent implements OnInit {
  groupId:string;
  usergroup:Usergroup[];
  keydata:Usergroup[];
  public keyList=[];
  constructor(private route:ActivatedRoute,private usergroupService:UsergroupService,private router:Router) { }

  ngOnInit() {
    this.groupId = this.route.snapshot.params['GroupId'];
    this.usergroupService.getGroupData(this.groupId).subscribe((usData)=>{
      this.usergroup=usData;
  });
  this.usergroupService.getKeyData(this.groupId).subscribe((usData)=>{
    this.keydata=usData;
});
//this.onData();
  }
  onData(){
    this.keyList.push({
    "CONTACT_NAME":"",
    "CONTACT_PHONE":"",
    "CONTACT_EMAIL":"",
    "CONTACT_FAX":"",
    "CONTACT_MOBILE":"",
    "CONTACT_DESIGNATION":""
    });
    
  }

  addFormfield(){
    this.keyList.push({
    "CONTACT_NAME":"",
    "CONTACT_PHONE":"",
    "CONTACT_EMAIL":"",
    "CONTACT_FAX":"",
    "CONTACT_MOBILE":"",
    "CONTACT_DESIGNATION":""
    }); 
    }
    removeElement()
    {
    this.keyList.pop();
    }
   
    onSubmit(){
      this.groupId = this.route.snapshot.params['GroupId'];
      var namearray = [];
      var phonearray = [];
      var emailarray = [];
      var faxarray = [];
      var mobilearray = [];
      var desiarray = [];
      var seqarray=[];
      var userid=localStorage.getItem('id');
      for(var i=0;i<this.keydata.length;i++){
      var SEQUENCE = ((document.getElementById('SEQUENCE'+i) as HTMLInputElement).value);
      var CONTACT_NAME = ((document.getElementById('CONTACT_NAME'+i) as HTMLInputElement).value);
      var CONTACT_PHONE = ((document.getElementById('CONTACT_PHONE'+i) as HTMLInputElement).value);
      var CONTACT_EMAIL = ((document.getElementById('CONTACT_EMAIL'+i) as HTMLInputElement).value);
      var CONTACT_FAX = ((document.getElementById('CONTACT_FAX'+i) as HTMLInputElement).value);
      var CONTACT_MOBILE = ((document.getElementById('CONTACT_MOBILE'+i) as HTMLInputElement).value);
      var CONTACT_DESIGNATION = ((document.getElementById('CONTACT_DESIGNATION'+i) as HTMLInputElement).value);
      namearray.push(CONTACT_NAME);
      phonearray.push(CONTACT_PHONE);
      emailarray.push(CONTACT_EMAIL);
      faxarray.push(CONTACT_FAX);
      mobilearray.push(CONTACT_MOBILE);
      desiarray.push(CONTACT_DESIGNATION);
      seqarray.push(SEQUENCE)
  }
      var usergroupdata={
        usergroup:this.usergroup,mobilearray:mobilearray,namearray:namearray,phonearray:phonearray,
        emailarray:emailarray,faxarray:faxarray,desiarray:desiarray,userid:userid,seqarray:seqarray
      }
      console.log("usergroupdata==",usergroupdata);

      this.usergroupService.update(usergroupdata,this.groupId ) 
      .subscribe((data) => {
        alert(data.success)
        this.router.navigate(['/tabs/groupmodules/searchbox']);
      });
    }

}
