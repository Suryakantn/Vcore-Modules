import { Injectable } from '@angular/core';
import { Registers } from './registers';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class UserroleService {
  public register = Registers;
  private groupurl:string="http://localhost:3000/creategroup";
  private roleAdd:string="http://localhost:3000/insertRole";
  private showViewUrl:string="http://localhost:3000/getAll";
  private showRolesUrl:string="http://localhost:3000/showRoles";
  private showMenus:string="http://localhost:3000/showMenus";
  private showSubMenuUrl:string="http://localhost:3000/showSubmenus";
  private insertRoleTabs:string="http://localhost:3000/insertRoleTabMenu";
  private editRoleUrl:string="http://localhost:3000/getRolesByIds";
  private taburl: string ="http://localhost:3000/tabs";
  constructor(private http:HttpClient) { }
  insertRoleData(data)
	  {
	    //roleAdd
      return this.http.post<Registers[]>(this.roleAdd,data);
      
    }
    showRoles(data): Observable<Registers[]>
  {
    //alert("tabs data"+data);
    return this.http.post<Registers[]>(this.showRolesUrl,data);
  }
  showMenus1(data): Observable<Registers[]>
  {
   // alert("menus data"+data);
    return this.http.post<Registers[]>(this.showMenus,data);
  }

  showSubMenus(data1): Observable<Registers[]>
  {
    
    return this.http.post<Registers[]>(this.showSubMenuUrl,data1);
  }
  getTabsData(data):Observable<Registers[]>
  {
    return this.http.post<Registers[]>(this.taburl,data);
  
  }
  insertRoleTabMenu(data):Observable<Registers[]>
  {
    alert("in servic="+data);
    return this.http.post<Registers[]>(this.insertRoleTabs,data);
  }
  getRolesById(data): Observable<Registers[]>
  {
    //editRoleUrl
    return this.http.post<Registers[]>(this.editRoleUrl,data);

  }
}
