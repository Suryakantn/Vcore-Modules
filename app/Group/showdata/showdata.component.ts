import { Component, OnInit } from '@angular/core';
import { UsergroupService } from '../usergroup.service';
import { Usergroup } from '../usergroup';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-showdata',
  templateUrl: './showdata.component.html',
  styleUrls: ['./showdata.component.css']
})
export class ShowdataComponent implements OnInit {
  usergroup:Usergroup[];
  userData:Usergroup[];
  Groupname:string;
  public urlArray=[];
  public arrySize;
  public check=true;
  groupId:string;
  keydata:Usergroup[];
  constructor(private usergroupService:UsergroupService,private route:ActivatedRoute) { }
  
  ngOnInit() {
    //this.groupId = this.route.snapshot.params['GroupId'];
    this.Groupname = this.route.snapshot.params['Groupname'];
    this.usergroupService.getUserGroupData(this.Groupname).subscribe((usData)=>{
      this.userData=usData;
      var url=this.userData[0].FQN_NAME;
      this.urlArray=url.split('/');
      this.arrySize=this.urlArray.length;

  });
  this.usergroupService.getUserKeyData(this.Groupname).subscribe((usData)=>{
    this.keydata=usData;
});
    this.usergroupService.getuserDataGroup(this.Groupname).subscribe((usData)=>{
      this.usergroup=usData;
      
      console.log(this.usergroup);
    });
  }

}
