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
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { CreateOwnerModalComponent } from './components/create-owner-modal/create-owner-modal.component';
import { NzInputModule } from 'ng-zorro-antd/input';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    OwnersComponent,
    CreateOwnerModalComponent
  ],
  imports: [
    CommonModule,
    OwnersRoutingModule,
    ReactiveFormsModule,
    StoreModule.forFeature('owners', ownersReducer),
    EffectsModule.forFeature(OwnersEffects),
    NzCardModule,
    NzSpinModule,
    NzButtonModule,
    NzModalModule,
    NzInputModule
  ]
})
export class OwnersModule { }
