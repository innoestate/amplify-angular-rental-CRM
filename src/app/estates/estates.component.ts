import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { combineLatest, map, Observable } from 'rxjs';
import { Estate } from '../core/models/estate.model';
import { selectOwners } from '../owners/store/owners.selectors';
import { loadEstates } from './store/estates.actions';
import { loadingEstates, selectEstates } from './store/estates.selectors';
import { EstatesService } from '../core/services/estates.service';
import { Lodger } from '../core/models/lodger.model';
import { selectLodgers } from '../loggers/store/lodgers.selectors';
import { formatEstates } from '../core/utils/estates.utils';
import { setLodgerDefaultAddress } from '../core/utils/lodgers.utils';
import { Owner } from '../core/models/owner.model';


@Component({
  selector: 'app-estates',
  templateUrl: './estates.component.html',
  styleUrl: './estates.component.less'
})
export class EstatesComponent implements OnInit {

  estates$: Observable<Estate[] | null> = this.store.select(selectEstates);
  loading$: Observable<boolean> = this.store.select(loadingEstates);
  owners$: Observable<any> = this.store.select(selectOwners);
  lodgers$: Observable<any> = this.store.select(selectLodgers);
  selectedEstate: Estate | null = null;
  editId!: string | null;
  rent: any;

  constructor(private store: Store, private EstateService: EstatesService) {

    this.estates$ = combineLatest([this.store.select(selectEstates),
    this.store.select(selectOwners),
    this.store.select(selectLodgers)]).pipe(
      map(([estates, owners, lodgers]) => formatEstates(estates, owners, lodgers))
    );

  }

  ngOnInit(): void {
    this.store.dispatch(loadEstates({ userId: 1 }));
    this.store.dispatch({ type: '[Owners] Load Owners' });
  }

  createEstate() {
    this.store.dispatch({ type: '[Estates] Toogle Create Estate Modal', visible: true });
  }

  setLodger(estate: Estate | null, lodger: Lodger) {
    this.selectedEstate = estate;
    const newLodger = { ...lodger, _estate: estate?.id ? estate.id : null };
    this.store.dispatch({ type: '[Lodgers] Update Lodger Estate', lodger: newLodger });
  }

  setOwner(estate: Estate, owner: Owner | null) {
    this.selectedEstate = estate;
    const newEstate = { id: estate.id, _owner: owner?.id ? owner.id : null  };
    this.store.dispatch({ type: '[Estates] Edit Estate', estate: newEstate })
  }

  removeLodger(estate: Estate) {
    this.selectedEstate = estate;
    const lodger = estate.lodger;
    if (lodger) {
      this.store.dispatch({ type: '[Lodgers] Update Lodger Estate', lodger: {id: lodger.id, _estate: null} });
    }
  }

  createRentReceipt(estate: Estate) {
    this.EstateService.generateRentreceiptAsPdf(estate.owner!, setLodgerDefaultAddress(estate.lodger!, estate), estate);
  }

  deleteEstate(estate: Estate) {
    this.store.dispatch({ type: '[Estates] Delete Estate', estate });
  }

  startEdit(id: string, ref: HTMLInputElement) {
    this.editId = id;
    setTimeout(() => {
      requestAnimationFrame(() => {
        ref.focus();
      })
    }, 0);
  }

  stopEdit() {
    this.editId = null;
  }

  edit(estate: Estate, fieldName: string, ref: HTMLInputElement) {
    const editableEstate: any = { id: estate.id };
    editableEstate[fieldName] = ref.value;
    this.store.dispatch({ type: '[Estates] Edit Estate', estate: editableEstate })
  }

}
