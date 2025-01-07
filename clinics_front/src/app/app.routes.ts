import { Routes } from '@angular/router';
import {LoginComponent} from './modules/auth/components/login/login.component';
import {HomeComponent} from './modules/info/components/home/home.component';
import {DeptsComponent} from './modules/appointment/components/depts/depts.component';
import {ClinicComponent} from './modules/appointment/components/clinic/clinic.component';
import {DoctorsComponent} from './modules/appointment/components/doctors/doctors.component';
import {DoctorComponent} from './modules/appointment/components/doctor/doctor.component';
import {AboutComponent} from './modules/info/components/about/about.component';
import {ContactsComponent} from './modules/info/components/contacts/contacts.component';

export const routes: Routes = [
  {
    path: "login",
    component: LoginComponent,
  },
  {
    path: "home",
    component: HomeComponent,
  },
  {
    path: "depts",
    component: DeptsComponent,
  },
  {
    path: "clinic/:id",
    component: ClinicComponent,
  },
  {
    path: "doctors/:id",
    component: DoctorsComponent,
  },
  {
    path: "doctors",
    component: DoctorsComponent,
  },
  {
    path: "doctor/:id",
    component: DoctorComponent,
  },
  {
    path: "about",
    component: AboutComponent,
  },
  {
    path: "contacts",
    component: ContactsComponent,
  }
];
