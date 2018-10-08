import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../../api.service';

@Component({
  selector: 'app-patient-list',
  templateUrl: './patient-list.component.html',
  styleUrls: ['./patient-list.component.scss']
})
export class PatientListComponent implements OnInit {
  private patients: Array<object> = [];
  private clinics: Array<object> = [];


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

}
