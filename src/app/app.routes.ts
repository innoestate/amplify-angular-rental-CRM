import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DeviceGuard } from './core/guards/device-detection.guard';

export const routes: Routes = [
  { path: '', canMatch: [DeviceGuard], pathMatch: 'full', redirectTo: 'desktop' },
  { path: 'desktop', canMatch: [DeviceGuard], loadChildren: () => import('./desktop/desktop.module').then(m => m.DesktopModule) },
  { path: 'mobile', canMatch: [DeviceGuard], loadChildren: () => import('./mobile/mobile.module').then(m => m.MobileModule) }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
