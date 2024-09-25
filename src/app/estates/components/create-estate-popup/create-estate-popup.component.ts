import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { createEstateModalVisible } from '../../store/estates.selectors';
import { selectOwners } from '../../../owners/store/owners.selectors';

@Component({
  selector: 'create-estate-popup',
  templateUrl: './create-estate-popup.component.html',
  styleUrl: './create-estate-popup.component.less'
})
export class CreateEstatePopupComponent {

  visible$ = this.store.select(createEstateModalVisible);
  owners$ = this.store.select(selectOwners);
  formGroup: FormGroup<any> = this.formBuilder.group({
    _owner: ['', Validators.required],
    _street: ['', Validators.required],
    _city: ['', Validators.required],
    _zip: ['', Validators.required],
    _parcel: [null],
    _rent: [null],
    _charges: [null]
  });

  constructor(private store: Store, private formBuilder: FormBuilder){}

  toogleVisible(event: any){
    this.store.dispatch({ type: '[Estates] Toogle Create Estate Modal', visible: false });
  }

  handleCancel(){
    this.store.dispatch({ type: '[Estates] Toogle Create Estate Modal', visible: false });
  }

  handleOk(){
    this.store.dispatch({ type: '[Estates] Create Estate', estate: this.formGroup.value });
    this.store.dispatch({ type: '[Estates] Toogle Create Estate Modal', visible: false });
  }

  selectOwner(owner: any){
    this.formGroup.controls['_owner'].setValue(owner.id);
  }
}
