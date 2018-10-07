import { Component, OnInit } from '@angular/core';

import { ApiService } from '../../../api.service';

@Component({
  selector: 'app-patient-list',
  templateUrl: './patient-list.component.html',
  styleUrls: ['./patient-list.component.scss']
})
export class PatientListComponent implements OnInit {
  private patients: Array<object> = [];

  constructor(private apiService: ApiService) { }

  ngOnInit() {
    this.getPatients();
  }

  public getPatients(){
    this.apiService.getPatients().subscribe((data: Array<Object>) => {
      this.patients = data;
      console.log('this.patients: ' + data);
    });
  }

}
