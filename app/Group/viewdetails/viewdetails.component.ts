import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UsergroupService } from '../usergroup.service';
import { Usergroup } from '../usergroup';

@Component({
  selector: 'app-viewdetails',
  templateUrl: './viewdetails.component.html',
  styleUrls: ['./viewdetails.component.css']
})
export class ViewdetailsComponent implements OnInit {
  groupId:string;
  usergroup:Usergroup[];
  userData:Usergroup[];
  keydata:Usergroup[];
  public urlArray=[];
  public arrySize;
  public check=true;
  constructor(private route:ActivatedRoute,private usergroupService:UsergroupService) { }

  ngOnInit() {
   
    this.groupId = this.route.snapshot.params['GroupId'];
    this.usergroupService.getGroupData(this.groupId).subscribe((usData)=>{
      this.usergroup=usData;
      var url=this.usergroup[0].FQN_NAME;
      this.urlArray=url.split('/');
      this.arrySize=this.urlArray.length;

  });
  this.usergroupService.getKeyData(this.groupId).subscribe((usData)=>{
    this.keydata=usData;
});
this.usergroupService.userdatagroup(this.groupId).subscribe((usData)=>{
  this.userData=usData;
  
  console.log(this.userData);
});
}

}
