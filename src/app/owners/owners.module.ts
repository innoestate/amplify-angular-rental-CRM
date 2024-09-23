import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OwnersComponent } from './owners.component';
import { OwnersRoutingModule } from './estates.routes';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { OwnersEffects } from './store/owners.effects';
import { ownersReducer } from './store/owners.reducers';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzSpinModule } from 'ng-zorro-antd/spin';

@NgModule({
  declarations: [
    OwnersComponent
  ],
  imports: [
    CommonModule,
    OwnersRoutingModule,
    StoreModule.forFeature('owners', ownersReducer),
    EffectsModule.forFeature(OwnersEffects),
    NzCardModule,
    NzSpinModule
  ]
})
export class OwnersModule { }
