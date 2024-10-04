import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EstatesComponent } from './estates.component';
import { EstatesRoutingModule } from './estates.routes';
import { StoreModule } from '@ngrx/store';
import { estatesReducer } from './store/estates.reducers';
import { EffectsModule } from '@ngrx/effects';
import { EstatesEffects } from './store/estates.effects';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzSpinModule } from 'ng-zorro-antd/spin';
import { ownersReducer } from '../owners/store/owners.reducers';
import { OwnersEffects } from '../owners/store/owners.effects';
import { CreateEstatePopupComponent } from './components/create-estate-popup/create-estate-popup.component';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzInputModule } from 'ng-zorro-antd/input';
import { ReactiveFormsModule } from '@angular/forms';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { LodgersReducer } from '../loggers/store/lodgers.reducers';
import { LodgersEffects } from '../loggers/store/lodgers.effects';
import { SetLodgerPopupComponent } from './components/set-lodger-popup/set-lodger-popup.component';

@NgModule({
  declarations: [
    EstatesComponent,
    CreateEstatePopupComponent,
    SetLodgerPopupComponent
  ],
  imports: [
    CommonModule,
    EstatesRoutingModule,
    ReactiveFormsModule,
    StoreModule.forFeature('estates', estatesReducer),
    EffectsModule.forFeature(EstatesEffects),
    StoreModule.forFeature('owners', ownersReducer),
    EffectsModule.forFeature(OwnersEffects),
    StoreModule.forFeature('lodgers', LodgersReducer),
    EffectsModule.forFeature(LodgersEffects),
    NzTableModule,
    NzCardModule,
    NzSpinModule,
    NzButtonModule,
    NzModalModule,
    NzInputModule,
    NzDropDownModule,
    NzSelectModule
  ],
})
export class EstatesModule { }
