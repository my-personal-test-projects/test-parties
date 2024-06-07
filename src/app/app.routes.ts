import { Routes } from '@angular/router';
import { LoginComponent } from './authentication/login/login.component';
import { AuthenticationComponent } from './authentication/authentication.component';
import { PagesComponent } from './pages/pages.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'authentication',
    pathMatch: 'full',
  },
  {
    path: 'authentication',
    component: AuthenticationComponent,
    loadChildren: () =>
      import('./authentication/authentication.route').then(
        (m) => m.authentication_routes
      ),
  },
  {
    path: 'pages',
    component: PagesComponent,
    loadChildren: () =>
      import('./pages/pages.routes').then((m) => m.pages_routes),
  },
  //   { path: '**', component: Page404Component },
];
