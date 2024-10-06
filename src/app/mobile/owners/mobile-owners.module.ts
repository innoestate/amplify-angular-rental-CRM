import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MobileOwnersComponent } from './mobile-owners.component';
import { MobileOwnersRoutingModule } from './mobile-owners.routes';



@NgModule({
  declarations: [
    MobileOwnersComponent
  ],
  imports: [
    CommonModule,
    MobileOwnersRoutingModule
  ]
})
export class MobileOwnersModule { }
