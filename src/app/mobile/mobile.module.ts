import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AmplifyAuthenticatorModule } from '@aws-amplify/ui-angular';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { NzPageHeaderModule } from 'ng-zorro-antd/page-header';
import { CoreModule } from '../core/core.module';
import { extModules } from './../build-specifics';
import { MobileRoutingModule } from './mobile.routes';
import { MobileComponent } from './mobile.component';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';

@NgModule({
  declarations: [
    MobileComponent
  ],
  imports: [
    CommonModule,
    CoreModule,
    MobileRoutingModule,
    FormsModule,
    HttpClientModule,
    NzPageHeaderModule,
    NzLayoutModule,
    NzDropDownModule,
    AmplifyAuthenticatorModule,
    extModules,
  ],
  exports: [
    NzLayoutModule,
    NzPageHeaderModule,
    NzMenuModule
  ]
})
export class MobileModule { }
