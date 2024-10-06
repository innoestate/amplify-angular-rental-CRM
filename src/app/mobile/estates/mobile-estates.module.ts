import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MobileEstatesRoutingModule } from './mobile-estates.routes';
import { MobileEstatesComponent } from './mobile-estates.component';
import { NzMenuModule } from 'ng-zorro-antd/menu';



@NgModule({
  declarations: [
    MobileEstatesComponent
  ],
  imports: [
    CommonModule,
    MobileEstatesRoutingModule,
    NzMenuModule
  ]
})
export class MobileEstatesModule { }
