import { AfterViewInit, Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { createOwnerModalVisible } from '../../../../core/store/owners.selectors';

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
    _phone: [''],
    _signature: ['']
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
