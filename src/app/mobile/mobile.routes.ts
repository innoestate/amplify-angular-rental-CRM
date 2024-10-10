import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MobileComponent } from './mobile.component';

export const routes: Routes = [
  {
    path: '', component: MobileComponent, children: [
      { path: '', pathMatch: 'full', redirectTo: 'estates' },
      { path: 'estates', loadChildren: () => import('./estates/mobile-estates.module').then(m => m.MobileEstatesModule) },
      { path: 'owners', loadChildren: () => import('./owners/mobile-owners.module').then(m => m.MobileOwnersModule) },
      { path: 'lodgers', loadChildren: () => import('./lodgers/mobile-lodgers.module').then(m => m.MobileLodgersModule) },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MobileRoutingModule { }
