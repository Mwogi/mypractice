import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Import Containers
import { DefaultLayoutComponent } from './containers';

import { P404Component } from './views/error/404.component';
import { P500Component } from './views/error/500.component';
import { LoginComponent } from './views/login/login.component';
import { RegisterComponent } from './views/register/register.component';
import { AuthGuard } from './auth.guard';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full',
    canActivate: [AuthGuard]
  },
  {
    path: '404',
    component: P404Component,
    data: {
      title: 'Page 404'
    }
  },
  {
    path: '500',
    component: P500Component,
    data: {
      title: 'Page 500'
    }
  },
  {
    path: 'login',
    component: LoginComponent,
    data: {
      title: 'Login Page'
    }
  },
  {
    path: 'register',
    component: RegisterComponent,
    data: {
      title: 'Register Page'
    }
  },
  {
    path: '',
    component: DefaultLayoutComponent,
    data: {
      title: 'Home'
    },
    children: [
      {
        path: 'patients',
        loadChildren: './views/patients/patients.module#PatientsModule',
        canActivate: [AuthGuard]
      },
      {
        path: 'nursing',
        loadChildren: './views/nursing/nursing.module#NursingModule',
        canActivate: [AuthGuard]
      },
      {
        path: 'accounts',
        loadChildren: './views/accounts/accounts.module#AccountsModule',
        canActivate: [AuthGuard]
      },
      {
        path: 'pharmacy',
        loadChildren: './views/pharmacy/pharmacy.module#PharmacyModule',
        canActivate: [AuthGuard]
      },
      {
        path: 'laboratory',
        loadChildren: './views/laboratory/laboratory.module#LaboratoryModule',
        canActivate: [AuthGuard]
      },
      {
        path: 'radiology',
        loadChildren: './views/radiology/radiology.module#RadiologyModule',
        canActivate: [AuthGuard]
      },
      {
        path: 'clinical',
        loadChildren: './views/clinical/clinical.module#ClinicalModule',
        canActivate: [AuthGuard]
      },
      {
        path: 'finance',
        loadChildren: './views/finance/finance.module#FinanceModule',
        canActivate: [AuthGuard]
      },
      {
        path: 'reports',
        loadChildren: './views/reports/reports.module#ReportsModule',
        canActivate: [AuthGuard]
      },
      {
        path: 'base',
        loadChildren: './views/base/base.module#BaseModule',
        canActivate: [AuthGuard]
      },
      {
        path: 'buttons',
        loadChildren: './views/buttons/buttons.module#ButtonsModule',
        canActivate: [AuthGuard]
      },
      {
        path: 'charts',
        loadChildren: './views/chartjs/chartjs.module#ChartJSModule',
        canActivate: [AuthGuard]
      },
      {
        path: 'dashboard',
        loadChildren: './views/dashboard/dashboard.module#DashboardModule',
        canActivate: [AuthGuard]
      },
      {
        path: 'icons',
        loadChildren: './views/icons/icons.module#IconsModule',
        canActivate: [AuthGuard]
      },
      {
        path: 'notifications',
        loadChildren: './views/notifications/notifications.module#NotificationsModule'
      },
      {
        path: 'widgets',
        loadChildren: './views/widgets/widgets.module#WidgetsModule',
        canActivate: [AuthGuard]
      }
    ]
  }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}
