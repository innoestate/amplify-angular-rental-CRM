import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DesktopModule } from './desktop.module';
import { DesktopComponent } from './desktop.component';

export const routes: Routes = [
  {
    path: '', component: DesktopComponent, children: [
      { path: '', pathMatch: 'full', redirectTo: 'estates' },
      { path: 'estates', loadChildren: () => import('./estates/estates.module').then(m => m.EstatesModule) },
      { path: 'owners', loadChildren: () => import('./owners/owners.module').then(m => m.OwnersModule) },
      { path: 'loggers', loadChildren: () => import('./loggers/loggers.module').then(m => m.LoggersModule) },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DesktopRoutingModule { }
