import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PatientsRoutingModule } from './patients-routing.module';
import { PatientListComponent } from './patient-list/patient-list.component';
// Modal Component
import { ModalModule } from 'ngx-bootstrap/modal';
import { ModalsComponent } from '../notifications/modals.component';
import {AppModule} from  '../../app.module'
import { FormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    PatientsRoutingModule,
    FormsModule,
    ModalModule.forRoot()
  ],
  declarations: [
    PatientListComponent,
    ModalsComponent
  ]
})
export class PatientsModule { }
