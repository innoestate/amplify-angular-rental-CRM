import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MobileEstatesRoutingModule } from './mobile-estates.routes';
import { MobileEstatesComponent } from './mobile-estates.component';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { StoreModule } from '@ngrx/store';
import { estatesReducer } from '../../core/store/estates.reducers';
import { EstatesEffects } from '../../core/store/estates.effects';
import { EffectsModule } from '@ngrx/effects';
import { ownersReducer } from '../../core/store/owners.reducers';
import { OwnersEffects } from '../../core/store/owners.effects';
import { LodgersReducer } from '../../core/store/lodgers.reducers';
import { LodgersEffects } from '../../core/store/lodgers.effects';

@NgModule({
  declarations: [
    MobileEstatesComponent
  ],
  imports: [
    CommonModule,
    MobileEstatesRoutingModule,
    NzMenuModule,
    StoreModule.forFeature('estates', estatesReducer),
    EffectsModule.forFeature(EstatesEffects),
    StoreModule.forFeature('owners', ownersReducer),
    EffectsModule.forFeature(OwnersEffects),
    StoreModule.forFeature('lodgers', LodgersReducer),
    EffectsModule.forFeature(LodgersEffects),
  ]
})
export class MobileEstatesModule { }
