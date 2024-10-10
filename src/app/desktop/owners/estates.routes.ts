import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OwnersComponent } from './owners.component';

export const routes: Routes = [
  { path: '',
    component: OwnersComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OwnersRoutingModule { }
