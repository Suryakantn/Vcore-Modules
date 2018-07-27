import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule,ReactiveFormsModule} from '@angular/forms'
import { RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { AppRoutingModule } from './/app-routing.module';
import { HttpModule } from '@angular/http';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { MainComponent } from './main/main.component';
import { StorageServiceModule} from 'angular-webstorage-service';
import { WebStorageService } from 'angular-webstorage-service';
import { TabComponent } from './tab/tab.component';
import { BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { MatTabsModule } from '@angular/material/tabs'
import { MatMenuModule } from '@angular/material/menu';
import { XmldataComponent } from './xmldata/xmldata.component';
import { UserdataComponent } from './userdata/userdata.component';
import { GooglemapComponent } from './googlemap/googlemap.component';
import { AgmCoreModule } from '@agm/core';
import { GmapComponent } from './gmap/gmap.component';
import { SearchboxComponent } from './Group/searchbox/searchbox.component';
import { CreategroupComponent } from './Group/creategroup/creategroup.component';
import { ShowdataComponent } from './Group/showdata/showdata.component';
import { ActivityComponent} from './Group/activity/activity.component';
import { SubgroupComponent } from './Group/subgroup/subgroup.component';
import { ViewdetailsComponent } from './Group/viewdetails/viewdetails.component';
import {NgxPaginationModule} from 'ngx-pagination';
import { EditgroupComponent } from './Group/editgroup/editgroup.component';
import { UsermanageComponent } from './usermanage/usermanage.component';
import { UserComponent } from './usermanage/user/user.component';
import { RoleComponent } from './usermanage/role/role.component';
import { ShowrolesComponent } from './usermanage/showroles/showroles.component';
import { ManageprivilagesComponent } from './usermanage/manageprivilages/manageprivilages.component';
import { UsercreationComponent } from './usermanage/usercreation/usercreation.component';
import { SubmenuesComponent } from './usermanage/submenues/submenues.component';
import { ProfileComponent } from './profile/profile.component';
import { GroupmoduleComponent } from './groupmodule/groupmodule.component';
import { TabsComponent } from './tabs/tabs.component';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    RegisterComponent,
    LoginComponent,
    HeaderComponent,
    FooterComponent,
    MainComponent,
    TabComponent,
    XmldataComponent,
    UserdataComponent,
    GooglemapComponent,
    ActivityComponent,
    GmapComponent,
    SearchboxComponent,
    CreategroupComponent,
    ShowdataComponent,
    SubgroupComponent,
    ViewdetailsComponent,
    EditgroupComponent,
    UsermanageComponent,
    UserComponent,
    RoleComponent,
    ShowrolesComponent,
    ManageprivilagesComponent,
    UsercreationComponent,
    SubmenuesComponent,
    ProfileComponent,
    GroupmoduleComponent,
    TabsComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    RouterModule.forRoot([]),
    HttpModule,
    StorageServiceModule,
    BrowserAnimationsModule,
    MatTabsModule,
    ReactiveFormsModule,
    MatMenuModule,
    NgxPaginationModule,
    HttpClientModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyBhqGw5qRaOs2ktXfuu8THgKJiboJBYDdQ'
    })
  
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
