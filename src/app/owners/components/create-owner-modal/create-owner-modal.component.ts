import { Component, Input, input } from '@angular/core';
import { Store } from '@ngrx/store';
import { createOwnerModalVisible } from '../../store/owners.selectors';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'create-owner-modal',
  templateUrl: './create-owner-modal.component.html',
  styleUrl: './create-owner-modal.component.less'
})
export class CreateOwnerModalComponent {

  visible$ = this.store.select(createOwnerModalVisible);
  formGroup: FormGroup<any> = this.formBuilder.group({
    _name: ['', Validators.required],
    _street: ['', Validators.required],
    _city: ['', Validators.required],
    _zip: ['', Validators.required],
    _email: [''],
    _phone: ['']
  });

  constructor(private store: Store, private formBuilder: FormBuilder){}

  toogleVisible(event: any){
    this.store.dispatch({ type: '[Owners] Toogle Create Owner Modal', visible: false });
  }

  handleCancel(){
    this.store.dispatch({ type: '[Owners] Toogle Create Owner Modal', visible: false });
  }

  handleOk(){
    this.store.dispatch({ type: '[Owners] Add Owner', owner: this.formGroup.value });
    this.store.dispatch({ type: '[Owners] Toogle Create Owner Modal', visible: false });
  }
}
