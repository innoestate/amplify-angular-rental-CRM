import { Component } from '@angular/core';
import { createLodgerModalVisible } from '../../../../core/store/lodgers.selectors';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { CommonModule } from '@angular/common';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { CoreModule } from '../../../../core/core.module';

@Component({
  selector: 'create-lodger-popup',
  templateUrl: './create-lodger-popup.component.html',
  styleUrl: './create-lodger-popup.component.less',
  standalone: true,
  imports: [
    CommonModule,
    NzInputModule,
    ReactiveFormsModule,
    NzButtonModule,
    NzModalModule,
    CoreModule
  ]
})
export class CreateLodgerPopupComponent {

  visible$ = this.store.select(createLodgerModalVisible);
  formGroup: FormGroup<any> = this.formBuilder.group({
    _name: ['', Validators.required],
    _email: [''],
    _phone: ['']
  });

  constructor(private store: Store, private formBuilder: FormBuilder){}

  toogleVisible(event: any){
    this.store.dispatch({ type: '[Lodgers] Toogle Create Lodger Modal', visible: false });
  }

  handleCancel(){
    this.store.dispatch({ type: '[Lodgers] Toogle Create Lodger Modal', visible: false });
  }

  handleOk(){
    this.store.dispatch({ type: '[Lodgers] Add Lodger', Lodger: this.formGroup.value });
    this.store.dispatch({ type: '[Lodgers] Toogle Create Lodger Modal', visible: false });
  }
}
