import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SignatureComponent } from './components/signature/signature.component';
import { NzIconModule } from 'ng-zorro-antd/icon';



@NgModule({
  declarations: [
    SignatureComponent
  ],
  imports: [
    CommonModule,
    NzIconModule
  ],
  exports: [
    SignatureComponent,
    NzIconModule
  ]
})
export class CoreModule { }
