import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MobileLodgersComponent } from './mobile-lodgers.component';
import { MobileLodgersRoutingModule } from './mobile-lodgers.routes';

@NgModule({
  declarations: [
    MobileLodgersComponent
  ],
  imports: [
    CommonModule,
    MobileLodgersRoutingModule
  ]
})
export class MobileLodgersModule { }
