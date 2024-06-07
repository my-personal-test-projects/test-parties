import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';

export const authentication_routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
  {
    path: 'login',
    component: LoginComponent,
  },
];
