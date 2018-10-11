import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../../api.service';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { ModalModule } from 'ngx-bootstrap/modal';
import { ModalsComponent } from '../../notifications/modals.component';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Subject } from 'rxjs/Subject';
import {Patient} from '../../../publicClasses';
import { debounceTime,map } from 'rxjs/operators';
import { Observable, of } from 'rxjs';

@Component({
  selector: 'app-patient-list',
  templateUrl: './patient-list.component.html',
  styleUrls: ['./patient-list.component.scss']
})
export class PatientListComponent implements OnInit { 
  private patients: Array<object> = [];
  private clinics: Array<object> = [];
  private providers: Array<object> = [];
  public myModal;
  selectedPatient =[];

  patientModel = new Patient(null,'','','',null,'','','','','','','','','','','','',null,null,null,null,null,'','','','','','','','','','','');

  constructor(private apiService: ApiService, private http: HttpClient) {
   
   }
  filterPatient: string;
  filterClinic: string;
  filterProvider: string;
  postClinic: string;
  clinic: string;
  
  ngOnInit() {

    this.filterPatient ="";
    this.getPatients();
    this.getProviders();
    this.getClinics(); 
  }

  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

       // TODO: better job of transforming error for user consumption
       console.log(`${operation} failed: ${error.message}`);

       // Let the app keep running by returning an empty result.
       return of(result as T);
    };
  }
  private extractData(res: Response) {
    let body = res;
    return body || { };
  }

  //To filter patients. We listen the patient search typing event
  onPatientKeyUp(event:any){
    this.filterPatient = event.target.value;
    this.getPatients()
  }
 
    //To filter clinics. We listen the clinic search typing event
  onClinicKeyUp(event:any){
    this.filterClinic = event.target.value;
    this.getClinics();
  }
    //To filter Providers. We listen the clinic search typing event
    onProviderKeyUp(event:any){
      this.filterProvider = event.target.value;
      this.getProviders();
    }


  onSelect(selectedItem: any) {
    this.clinic = selectedItem.name;  
    this.selectedPatient = selectedItem;
    console.log(selectedItem.fname);
    this.getPatients();
    this.getClinics();
  }

  public getPatients(){
    return this.http.get('http://localhost:3000/api/patient?_where=(fname,like,~'+this.filterPatient+')~or(lname,like,~'+this.filterPatient+')~or(clinic,like,~'+this.clinic+')')
    .pipe(debounceTime(5000))
    .subscribe((data: Array<Object>) => {
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
  // GET PROVIDERS
  public getProviders() {
    this.http.get('http://localhost:3000/api/users?_where=(canBill,eq,1)~and(retire,eq,0)&_size=100').subscribe((data: Array<Object>) => {
    this.providers = data.filter(data => data.titleName.match(this.filterProvider));
    });
  }
  public getPat() {
    return this.http.get('http://localhost:3000/api/patient?_where=(fname,like,~'+this.filterPatient+')~or(lname,like,~'+this.filterPatient+')~or(clinic,like,~'+this.clinic+')')
    .pipe(debounceTime(1000))
    .subscribe((data: Array<Object>) => {
      this.patients = data;
      //console.log('this.patients: ' + data);
    });
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
