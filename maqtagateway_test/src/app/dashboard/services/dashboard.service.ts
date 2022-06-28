import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  readonly url;

  constructor(private http :HttpClient) {
    this.url= 'https://retoolapi.dev/DV6x5A/';
   }

  getEmployeeslist(){
   return this.http.get(`${this.url}/employees`);
  }

  addNewemployeedetails(employeeData: Object){
   return this.http.post(`${this.url}/employees`,employeeData)
  }

  updateEmployeeDetails(id :string,updateData: Object){
    return this.http.put(`${this.url}/employees/${id}`,updateData)
  }

  deleteEmployeeDetails(id: string){
    return this.http.delete(`${this.url}/employees/${id}`)
  }

  searchFullName(userName : string){
    return this.http.get(`${this.url}/employees?fullName=${userName}`);
  }
  searchCompany(companyName : string){
    return this.http.get(`${this.url}/employees?company=${companyName}`);
  }
  searchEmail(email : string){
    return this.http.get(`${this.url}/employees?email=${email}`);
  }
}
