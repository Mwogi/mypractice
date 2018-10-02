import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PatientListComponent } from './patient-list/patient-list.component';

const routes: Routes = [
  {
    path: '',
    data: {
      title: 'Patients'
    },
    children: [
      {
        path: 'patientslist',
        component: PatientListComponent,
        data: {
          title: 'Patient List'
        }
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PatientsRoutingModule { }
