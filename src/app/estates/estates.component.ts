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

  setLodger(estate: Estate, lodger: Lodger) {
    this.selectedEstate = estate;
    const newLodger = { ...lodger, _estate: estate.id };
    this.store.dispatch({ type: '[Lodgers] Update Lodger Estate', lodger: newLodger });
  }

  createRentReceipt(estate: Estate) {

    const owner = {
      _name: 'jean dupont',
      _street: 'rue de la paix',
      _city: 'paris',
      _zip: '75000'
    }
    const lodger = {
      _name: 'pierre dupont',
      _street: 'rue de la paix',
      _city: 'paris',
      _zip: '75000'
    }

    this.EstateService.generateRentreceiptAsPdf(owner, lodger, estate);
  }

  deleteEstate(estate: Estate) {
    this.store.dispatch({ type: '[Estates] Delete Estate', estate });
  }

}
