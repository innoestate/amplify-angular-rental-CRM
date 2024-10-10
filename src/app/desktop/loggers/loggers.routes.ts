import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoggersComponent } from './loggers.component';

export const routes: Routes = [
  { path: '',
    component: LoggersComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LoggersRoutingModule { }
