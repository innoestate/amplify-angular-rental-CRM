import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MobileComponent } from './mobile.component';

export const routes: Routes = [
  {
    path: '', component: MobileComponent, children: [
      // { path: '', pathMatch: 'full', redirectTo: 'estates' },
      // { path: 'estates', loadChildren: () => import('./estates/estates.module').then(m => m.EstatesModule) },
      // { path: 'owners', loadChildren: () => import('./owners/owners.module').then(m => m.OwnersModule) },
      // { path: 'loggers', loadChildren: () => import('./loggers/loggers.module').then(m => m.LoggersModule) },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MobileRoutingModule { }
