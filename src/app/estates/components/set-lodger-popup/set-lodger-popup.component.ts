import { Component, Input, input } from '@angular/core';
import { Store } from '@ngrx/store';
import { Lodger } from '../../../core/models/lodger.model';
import { selectLodgers } from '../../../loggers/store/lodgers.selectors';
import { setLodgerModalVisible } from '../../store/estates.selectors';
import { Estate } from '../../../core/models/estate.model';

@Component({
  selector: 'set-lodger-popup',
  templateUrl: './set-lodger-popup.component.html',
  styleUrl: './set-lodger-popup.component.less'
})
export class SetLodgerPopupComponent {

  @Input() selectedEstate!: Estate;
  visible$ = this.store.select(setLodgerModalVisible);
  lodgers$ = this.store.select(selectLodgers);
  selectedLodger!: Lodger;

  constructor(private store: Store){}

  toogleVisible(event: any){
    this.store.dispatch({ type: '[Estates] Toogle Set Lodger Modal', visible: false });
  }

  handleCancel(){
    this.store.dispatch({ type: '[Estates] Toogle Set Lodger Modal', visible: false });
  }

  handleOk(){
    this.store.dispatch({ type: '[Lodgers] Update Lodger Estate', lodger: this.selectedLodger});
    this.store.dispatch({ type: '[Estates] Toogle Set Lodger Modal', visible: false });
  }

  selectLodger(lodger: Lodger){
    const newLodger = { ...lodger, _estate: this.selectedEstate?.id };
    this.selectedLodger = newLodger;
  }

}
