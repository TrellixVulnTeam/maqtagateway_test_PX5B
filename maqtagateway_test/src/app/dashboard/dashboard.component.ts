import { Component, OnInit } from '@angular/core';
import {FormBuilder,FormGroup, Validators} from '@angular/forms'
import { EmployeeModel } from './models/employee-dashboard.model';
import { DashboardService } from './services/dashboard.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  formValue !: FormGroup;
  gender : any;
  employeeDataModel :EmployeeModel = new EmployeeModel();
  employeeDetails : any;
  showAdd !: boolean ;
  showUpdate !: boolean;
  p: number = 1;
  constructor(private formbuilder : FormBuilder,
    private dashboardService : DashboardService) {
      
     }

  ngOnInit(): void {
    this.formValue = this.formbuilder.group({
      fullName : ['',Validators.required],
      id: [''],
      dob: ['',Validators.required],
      email: ['',Validators.required],
      phone: ['',Validators.required],
      gender: ['',Validators.required],
      company: ['',Validators.required],
      position: ['',Validators.required]
    })
    this.getEmployeeDetails();
  }

   getEmployeeDetails(){
    this.dashboardService.getEmployeeslist().subscribe((response:any)=>{
      this.employeeDetails = response;
    })
   }
  onClickAddEmployee(){
    this.formValue.reset();
    this.showAdd = true;
    this.showUpdate = false;
  }
   newEmployeeData(){
    this.employeeDataModel.fullName = this.formValue.value.fullName;
    this.employeeDataModel.dob = this.formValue.value.dob;
    this.employeeDataModel.email = this.formValue.value.email;
    this.employeeDataModel.id = this.formValue.value.id;
    this.employeeDataModel.company = this.formValue.value.company;
    this.employeeDataModel.gender = this.gender;
    this.employeeDataModel.phone = this.formValue.value.phone;
    this.employeeDataModel.position = this.formValue.value.position;

      this.dashboardService.addNewemployeedetails(this.employeeDataModel).subscribe((x:any)=>{
        alert('New Employee data added successfully')
        let ref = document.getElementById('cancel')
        ref?.click();
        this.formValue.reset();
        this.getEmployeeDetails();
      },err=>{
        alert('Somethimg went wrong')
      })
 
   }


   deleteEmployee(row: any){
    this.dashboardService.deleteEmployeeDetails(row.id).subscribe((x:any)=>{
      this.getEmployeeDetails();
    })
   }

   onEdit(row : any){
   this.showAdd = false;
   this.showUpdate = true;
   this.employeeDataModel.id = row.id;
    this.formValue.controls['fullName'].setValue(row.fullName);
    this.formValue.controls['dob'].setValue(row.dob);
    this.formValue.controls['email'].setValue(row.email);
    this.formValue.controls['company'].setValue(row.company);
    this.gender = this.formValue.controls['gender'].setValue(row.gender);
    this.formValue.controls['gender'].setValue(row.gender);
    this.formValue.controls['position'].setValue(row.position);
    this.formValue.controls['phone'].setValue(row.phone);
    this.formValue.controls['id'].setValue(row.id);
   }

   updateEmployeeDetails(){
    this.employeeDataModel.fullName = this.formValue.value.fullName;
    this.employeeDataModel.dob = this.formValue.value.dob;
    this.employeeDataModel.email = this.formValue.value.email;
    this.employeeDataModel.id = this.formValue.value.id;
    this.employeeDataModel.company = this.formValue.value.company;
    this.employeeDataModel.gender = this.gender;
    this.employeeDataModel.phone = this.formValue.value.phone;
    this.employeeDataModel.position = this.formValue.value.position;
    this.dashboardService.updateEmployeeDetails(this.employeeDataModel.id,this.employeeDataModel).subscribe((x:any)=>{
      alert('Updated Data Successfully')
      let ref = document.getElementById('cancel')
      ref?.click();
      this.formValue.reset();
      this.getEmployeeDetails();
    },err=>{
      alert('Somethimg went wrong')
    })
   }

   onSearchName(event : any){
    const userName = event.target.value;
    if(userName){
      this.dashboardService.searchFullName(userName).subscribe((response:any)=>{
        this.employeeDetails = response;
      })
    } else{
      this.getEmployeeDetails();
    }
   }

   onSearchCompany(event : any){
    const company = event.target.value;
    if(company){
      this.dashboardService.searchCompany(company).subscribe((response:any)=>{
        this.employeeDetails = response;
      })
    }else{
      this.getEmployeeDetails();
    }
   }

   onSearchEmail(event : any){
    const email = event.target.value;
    if(email){
      this.dashboardService.searchEmail(email).subscribe((response:any)=>{
        this.employeeDetails = response;
      })
    }else{
      this.getEmployeeDetails();
    }
   }
}
