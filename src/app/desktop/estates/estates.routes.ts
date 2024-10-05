import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EstatesComponent } from './estates.component';

export const routes: Routes = [
  { path: '',
    component: EstatesComponent
  },
  // { path: 'welcome', loadChildren: () => import('./pages/welcome/welcome.routes').then(m => m.WELCOME_ROUTES) }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EstatesRoutingModule { }
