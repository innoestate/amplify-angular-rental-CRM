import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EstatesComponent } from './estates.component';
import { EstatesRoutingModule } from './estates.routes';
import { StoreModule } from '@ngrx/store';
import { estatesReducer } from './store/estates.reducers';
import { EffectsModule } from '@ngrx/effects';
import { EstatesEffects } from './store/estates.effects';



@NgModule({
  declarations: [
    EstatesComponent
  ],
  imports: [
    CommonModule,
    EstatesRoutingModule,
    StoreModule.forFeature('estates', estatesReducer),
    EffectsModule.forFeature(EstatesEffects)
  ]
})
export class EstatesModule { }
