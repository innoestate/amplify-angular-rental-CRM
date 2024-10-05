import { Component } from '@angular/core';
import { createLodgerModalVisible } from '../../../../core/store/lodgers.selectors';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';

@Component({
  selector: 'create-lodger-popup',
  templateUrl: './create-lodger-popup.component.html',
  styleUrl: './create-lodger-popup.component.less'
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
