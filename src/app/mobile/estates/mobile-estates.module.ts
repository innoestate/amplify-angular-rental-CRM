import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MobileEstatesRoutingModule } from './mobile-estates.routes';
import { MobileEstatesComponent } from './mobile-estates.component';



@NgModule({
  declarations: [
    MobileEstatesComponent
  ],
  imports: [
    CommonModule,
    MobileEstatesRoutingModule
  ]
})
export class MobileEstatesModule { }
