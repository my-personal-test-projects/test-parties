import { Routes } from '@angular/router';
import { AddComponent } from './add/add.component';
import { ViewComponent } from './view/view.component';
import { DetailsComponent } from './details/details.component';

export const pages_routes: Routes = [
  {
    path: '',
    redirectTo: 'parties',
    pathMatch: 'full',
  },
  {
    path: 'parties',
    component: DetailsComponent,
  },
  {
    path: 'parties/create',
    component: AddComponent,
  },
  {
    path: 'parties/view/:id/:action',
    component: ViewComponent,
  },
];
