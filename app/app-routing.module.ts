import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { MainComponent } from './main/main.component';
import { HeaderComponent } from './header/header.component';
import { AppComponent } from './app.component';
import { TabComponent } from './tab/tab.component';
import { XmldataComponent } from './xmldata/xmldata.component';
import { UserdataComponent } from './userdata/userdata.component';
import { GooglemapComponent } from './googlemap/googlemap.component';
import { SearchboxComponent } from './Group/searchbox/searchbox.component';
import { CreategroupComponent } from './Group/creategroup/creategroup.component';
import { ShowdataComponent } from './Group/showdata/showdata.component';
import { SubgroupComponent } from './Group/subgroup/subgroup.component';
import { ViewdetailsComponent } from './Group/viewdetails/viewdetails.component';
import { ActivityComponent } from './Group/activity/activity.component';
import { EditgroupComponent } from './Group/editgroup/editgroup.component';
import { UserComponent } from './usermanage/user/user.component';
import { RoleComponent } from './usermanage/role/role.component';
import { ShowrolesComponent } from './usermanage/showroles/showroles.component';
import { ManageprivilagesComponent } from './usermanage/manageprivilages/manageprivilages.component';
import { UsercreationComponent } from './usermanage/usercreation/usercreation.component';
import { SubmenuesComponent } from './usermanage/submenues/submenues.component';
import { TabsComponent } from './tabs/tabs.component';
import { GroupmoduleComponent } from './groupmodule/groupmodule.component';
import { GmapComponent } from './gmap/gmap.component';
import { ProfileComponent } from './profile/profile.component';


const routes:Routes=[
  { path:'register' , component: RegisterComponent, pathMatch: 'full'},
  { path:'login' , component: LoginComponent},  
  { path:'header' , component: HeaderComponent},
  { path:'' , component: MainComponent},
  { path:'main' , component: MainComponent},
  { path:'googlemap' , component: GooglemapComponent},
  { path:'tabs' , component: TabsComponent,
  children:[

    { path: 'user', component: UserComponent,
    children:[
      {path:'role',component: RoleComponent},
      {path:'showRole',component: ShowrolesComponent},
      {path:'managepre/:roleid',component:ManageprivilagesComponent},
      {path:'usercreation',component: UsercreationComponent},
      {path:'submenus',component: SubmenuesComponent}   
    ]
    },
    { path:'groupmodules' , component: GroupmoduleComponent,
    children: [
      { path: 'searchbox', component: SearchboxComponent },
      { path: 'creategroup', component: CreategroupComponent },
      { path: 'subgroup', component: SubgroupComponent },
      { path: 'showdata/:Groupname', component: ShowdataComponent },
      { path: 'search',component:ActivityComponent},
      { path: 'viewgroupdetails/:GroupId', component: ViewdetailsComponent },
      { path: 'editgroup/:GroupId', component: EditgroupComponent }
    ]    
   },

  { path:'profile' , component: ProfileComponent,
  children: [
    { path: 'userdata', component: UserdataComponent },
    { path: 'xmldata', component: XmldataComponent },
  ]    
 },
   { path:'googlemap' , component: GmapComponent},
  ]
  },
  { path:'' , component: AppComponent}

];
@NgModule({
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ],
  exports: [ RouterModule ]
})
export class AppRoutingModule { }
