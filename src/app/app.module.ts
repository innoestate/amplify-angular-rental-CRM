import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { AmplifyAuthenticatorModule } from '@aws-amplify/ui-angular';
import { NzPageHeaderModule } from 'ng-zorro-antd/page-header';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app.routes';
import { BrowserModule } from '@angular/platform-browser';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppInitializerProvider } from './services/app-initializer.service';
import { NZ_I18N, zh_CN } from 'ng-zorro-antd/i18n';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    CommonModule,
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    NzPageHeaderModule,
    NzLayoutModule,
    NzMenuModule,
    AmplifyAuthenticatorModule,
    AppRoutingModule
  ],
  exports: [
    NzLayoutModule,
    NzPageHeaderModule,
    NzMenuModule
  ],
  // providers: [AppInitializerProvider, { provide: NZ_I18N, useValue: zh_CN }],
  providers: [{ provide: NZ_I18N, useValue: zh_CN }],
  bootstrap: [AppComponent]
})
export class AppModule { }
