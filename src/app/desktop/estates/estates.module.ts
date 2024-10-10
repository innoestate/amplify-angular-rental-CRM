import { CoreModule } from '../../core/core.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DesktopEstatesComponent } from './estates.component';
import { EstatesRoutingModule } from './estates.routes';
import { StoreModule } from '@ngrx/store';
import { estatesReducer } from './../../core/store/estates.reducers';
import { EffectsModule } from '@ngrx/effects';
import { EstatesEffects } from './../../core/store/estates.effects';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzSpinModule } from 'ng-zorro-antd/spin';
import { ownersReducer } from '../../core/store/owners.reducers';
import { OwnersEffects } from '../../core/store/owners.effects';
import { CreateEstatePopupComponent } from './components/create-estate-popup/create-estate-popup.component';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzInputModule } from 'ng-zorro-antd/input';
import { ReactiveFormsModule } from '@angular/forms';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { LodgersReducer } from '../../core/store/lodgers.reducers';
import { LodgersEffects } from '../../core/store/lodgers.effects';
import { SetLodgerPopupComponent } from './components/set-lodger-popup/set-lodger-popup.component';
import { NzInputNumberModule } from 'ng-zorro-antd/input-number';
import { CreateOwnerModalComponent } from '../owners/components/create-owner-modal/create-owner-modal.component';
import { CreateLodgerPopupComponent } from '../loggers/components/create-logger-popup/create-lodger-popup.component';

@NgModule({
  declarations: [
    DesktopEstatesComponent,
    CreateEstatePopupComponent,
    SetLodgerPopupComponent
  ],
  imports: [
    CoreModule,
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
    NzSelectModule,
    NzInputNumberModule,
    CreateOwnerModalComponent,
    CreateLodgerPopupComponent,
    ReactiveFormsModule,
  ],
  exports: [
    CreateOwnerModalComponent
  ]
})
export class EstatesModule { }
