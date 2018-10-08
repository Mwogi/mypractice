import { Component, OnInit } from '@angular/core';
<<<<<<< HEAD

import { ApiService } from '../../../api.service';
=======
import { ApiService } from '/media/juma/603B6E360255F0C7/Projects/Angular/mypractice/src/app/api.service';//'/Node/mypractice-core/src/app/api.service';
>>>>>>> 761dcb8342f4fcacf46c7d053897144c85078cea

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
