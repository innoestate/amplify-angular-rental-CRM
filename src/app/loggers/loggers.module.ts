import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoggersComponent } from './loggers.component';
import { LoggersRoutingModule } from './loggers.routes';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { LodgersReducer } from './store/lodgers.reducers';
import { LodgersEffects } from './store/lodgers.effects';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzSpinModule } from 'ng-zorro-antd/spin';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzInputModule } from 'ng-zorro-antd/input';
import { ReactiveFormsModule } from '@angular/forms';
import { CreateLodgerPopupComponent } from './components/create-logger-popup/create-lodger-popup.component';
import { NzTableModule } from 'ng-zorro-antd/table';

@NgModule({
  declarations: [
    LoggersComponent,
    CreateLodgerPopupComponent
  ],
  imports: [
    CommonModule,
    LoggersRoutingModule,
    StoreModule.forFeature('lodgers', LodgersReducer),
    EffectsModule.forFeature(LodgersEffects),
    ReactiveFormsModule,
    NzCardModule,
    NzSpinModule,
    NzButtonModule,
    NzModalModule,
    NzInputModule,
    NzTableModule
  ]
})
export class LoggersModule { }
