import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AmplifyAuthenticatorModule } from '@aws-amplify/ui-angular';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { NzPageHeaderModule } from 'ng-zorro-antd/page-header';
import { extModules } from './../build-specifics';
import { DesktopRoutingModule } from './desktop.routes';
import { DesktopComponent } from './desktop.component';
import { CoreModule } from '../core/core.module';

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
