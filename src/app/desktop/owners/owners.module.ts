import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OwnersComponent } from './owners.component';
import { OwnersRoutingModule } from './estates.routes';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { OwnersEffects } from '../../core/store/owners.effects';
import { ownersReducer } from '../../core/store/owners.reducers';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzSpinModule } from 'ng-zorro-antd/spin';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzInputModule } from 'ng-zorro-antd/input';
import { CreateOwnerModalComponent } from './components/create-owner-modal/create-owner-modal.component';
import { ReactiveFormsModule } from '@angular/forms';
import { CoreModule } from '../../core/core.module';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzInputNumberModule } from 'ng-zorro-antd/input-number';

@NgModule({
  declarations: [
    OwnersComponent,
    // CreateOwnerModalComponent
  ],
  imports: [
    CoreModule,
    CommonModule,
    OwnersRoutingModule,
    StoreModule.forFeature('owners', ownersReducer),
    EffectsModule.forFeature(OwnersEffects),
    ReactiveFormsModule,
    NzCardModule,
    NzSpinModule,
    NzButtonModule,
    NzModalModule,
    NzInputModule,
    NzTableModule,
    NzInputModule,
    NzInputNumberModule,
    CreateOwnerModalComponent
  ],
})
export class OwnersModule { }
