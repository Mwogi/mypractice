<<<<<<< HEAD
import { Component, OnInit, ViewChild } from '@angular/core';

import { ApiService } from '../../../api.service';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { ModalModule } from 'ngx-bootstrap/modal';
import { ModalsComponent } from '../../notifications/modals.component';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
=======
import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../../api.service';
>>>>>>> 026513198d770b4a771ebdd3b504da1cac91d5a4

@Component({
  selector: 'app-patient-list',
  templateUrl: './patient-list.component.html',
  styleUrls: ['./patient-list.component.scss']
})
export class PatientListComponent implements OnInit {
  private patients: Array<object> = [];
  private clinics: Array<object> = [];
<<<<<<< HEAD

  public myModal; 


  constructor(private apiService: ApiService, private http: HttpClient) { }
  filterPatient:string;
  filterClinic:string;
  clinic:string;
=======
>>>>>>> 026513198d770b4a771ebdd3b504da1cac91d5a4


  ngOnInit() {

  this.filterPatient ="";
    this.getPatients();
    this.getClinics();
  }

  //To filter patients. We listen the patient search typing event
  onPatientKeyUp(event:any){
    this.filterPatient = event.target.value;
    this.getPatients();
  }

    //To filter clinics. We listen the clinic search typing event
  onClinicKeyUp(event:any){
    this.filterClinic = event.target.value;
    this.getClinics();
  }

  onSelect(selectedItem: any) {
    this.clinic = selectedItem.name; 
    console.log(selectedItem.name);
    this.getPatients();
    this.getClinics();
  }

  public getPatients(){
    this.http.get('http://localhost:3000/api/patient?_where=(fname,like,~'+this.filterPatient+')~or(lname,like,~'+this.filterPatient+')~and(clinic,like,~'+this.clinic+')').subscribe((data: Array<Object>) => {
      this.patients = data;
      //console.log('this.patients: ' + data);
    });
  }
  public getClinics(){
    this.apiService.getClinics().subscribe((data: Array<Object>) =>{
      this.clinics = data.filter(data => data.name.match(this.filterClinic));
      //console.log('clinics available: '+ this.clinics);
    });
  }
  public getClinics(){
    this.apiService.getClinics().subscribe((data: Array<Object>) =>{
      this.clinics = data;
      console.log('clinics available: '+ data);
    });
  }

}
