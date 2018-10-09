import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../../api.service';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { ModalModule } from 'ngx-bootstrap/modal';
import { ModalsComponent } from '../../notifications/modals.component';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Subject } from 'rxjs/Subject';
import {Patient} from '../../../publicClasses';

@Component({
  selector: 'app-patient-list',
  templateUrl: './patient-list.component.html',
  styleUrls: ['./patient-list.component.scss']
})
export class PatientListComponent implements OnInit { 
  private patients: Array<object> = [];
  private clinics: Array<object> = [];
  public myModal;


  patientModel = new Patient(null,'','','',null,'','','','','','','','','','','','',null,null,null,null,null,'','','','','','','','','','','');

  constructor(private apiService: ApiService, private http: HttpClient) {
    this.apiService.search(this.searchTerm$)
      .subscribe(results => {
        this.results = results.results;
      });
   }
  filterPatient: string;
  filterClinic: string;
  postClinic: string;
  clinic: string;
  results: Object;
  searchTerm$ = new Subject<string>();

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
    this.http.get('http://localhost:3000/api/patient?_where=(fname,like,~'+this.filterPatient+')~or(lname,like,~'+this.filterPatient+')~or(clinic,like,~'+this.clinic+')').subscribe((data: Array<Object>) => {
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
  public getPats(){

  }

  public postPatient(){
    this.patientModel.age = "21yrs";//Will be calculated from dob
    
 //Now that we have the appropriate data lets fill in the gaps and post the datathis.postClinic = '{"id":"","lname":"JUMA","fname":"BRIANT","dateofbirth":"1995-12-31T21:00:00.000Z","gender":"Male","maritalstatus":null,"address":"","town":"","county":"","district":"","cellphone":"","contactperson":"","contactphone":"","age":"25y","ipNumber":"00003","ptStatus":"","clinic":"Orthopedic Surgery>23-2-2016,","clinicdate":null,"educationlevel":null,"occupation":"","religion":"","nationality":"KENYAN","idnumber":"","emailaddress":"","location":"","village":"","relationshipkin":null,"accessT":"2013-05-22T10:46:00.000Z","wardbed":null,"ward":null,"billinglevel":null,"void":{"type":"Buffer","data":[1]},"rebate":0}';
     this.http.post('http://localhost:3000/api/patient/', JSON.parse('{"id":null,"lname":"'+this.patientModel.lname+'","fname":"'+this.patientModel.fname+'","dateofbirth":"'+this.patientModel.dateofbirth+'","gender":"'+this.patientModel.gender+'","maritalstatus":"'+this.patientModel.maritalstatus+'","address":"'+this.patientModel.address+'","town":"'+this.patientModel.town+'","county":"'+this.patientModel.county+'","district":"'+this.patientModel.district+'","cellphone":"'+this.patientModel.cellphone+'","contactperson":"'+this.patientModel.contactperson+'","contactphone":"'+this.patientModel.contactphone+'","age":"'+this.patientModel.age+'","ipNumber":"'+this.patientModel.ipNumber+'","ptStatus":"'+this.patientModel.ptStatus+'","clinic":"'+this.patientModel.clinic+'","clinicdate":"'+this.patientModel.clinicDate+'","educationlevel":"'+this.patientModel.educationlevel+'","occupation":"'+this.patientModel.occupation+'","religion":"'+this.patientModel.relationshipkin+'","nationality":"'+this.patientModel.nationality+'","idnumber":"'+this.patientModel.idnumber+'","emailaddress":"'+this.patientModel.emailaddress+'","location":"'+this.patientModel.location+'","village":"'+this.patientModel.village+'","relationshipkin":"'+this.patientModel.relationshipkin+'","accessT":"'+this.patientModel.accessT+'","wardbed":"'+this.patientModel.wardbed+'","ward":"'+this.patientModel.ward+'","billinglevel":"'+this.patientModel.billinglevel+'","void":"'+this.patientModel.vooid+'","rebate":"'+this.patientModel.rebate+'"}'))
       .subscribe(
         (data:any)=>{
           console.log(data);
           
         }
       )
  }
}
