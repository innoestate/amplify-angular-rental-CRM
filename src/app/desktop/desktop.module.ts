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
import { DesktopComponent } from './desktop.component';
import { DesktopRoutingModule } from './desktop.routes';

@NgModule({
  declarations: [
    DesktopComponent
  ],
  imports: [
    CommonModule,
    CoreModule,
    DesktopRoutingModule,
    FormsModule,
    HttpClientModule,
    NzPageHeaderModule,
    NzLayoutModule,
    NzMenuModule,
    AmplifyAuthenticatorModule,
    extModules
  ],
  exports: [
    NzLayoutModule,
    NzPageHeaderModule,
    NzMenuModule
  ]
})
export class DesktopModule { }
