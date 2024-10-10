import { Component, Directive, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { combineLatest, map, Observable, take, tap } from 'rxjs';
import { Estate } from '../../core/models/estate.model';
import { selectOwners } from '../../core/store/owners.selectors';
import { loadEstates } from './../../core/store/estates.actions';
import { loadingEstates, selectEstates } from './../../core/store/estates.selectors';
import { EstatesService } from '../../core/services/estates.service';
import { Lodger } from '../../core/models/lodger.model';
import { selectLodgers } from '../../core/store/lodgers.selectors';
import { formatEstates } from '../../core/utils/estates.utils';
import { setLodgerDefaultAddress } from '../../core/utils/lodgers.utils';
import { Owner } from '../../core/models/owner.model';
import { Actions, ofType } from '@ngrx/effects';
import { fetchGoogleAccessToken, sendEmailWithGmail } from '../../desktop/desktop.component';


@Directive()
export class EstatesComponent implements OnInit {

  estates$: Observable<Estate[] | null> = this.store.select(selectEstates);
  loading$: Observable<boolean> = this.store.select(loadingEstates);
  owners$: Observable<any> = this.store.select(selectOwners);
  lodgers$: Observable<any> = this.store.select(selectLodgers);
  selectedEstate: Estate | null = null;
  editId!: string | null;
  rent: any;

  constructor(private store: Store, private actions$: Actions, private EstateService: EstatesService) {

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

  createOwner(estate?: Estate) {

    console.log(fetchGoogleAccessToken());

    const token = fetchGoogleAccessToken();
    sendEmailWithGmail(token!, 'innoestateholdings@gmail.com', 'mathieucolla@gmail.com');

    this.store.dispatch({ type: '[Owners] Toogle Create Owner Modal', visible: true, estate });
    if (estate) {
      this.actions$.pipe(
        ofType('[Owners] Add Owner Success'),
        take(1),
        tap(({ owner }) => {
          console.log('owner created', owner);
          this.store.dispatch({ type: '[Estates] Edit Estate', estate: { id: estate?.id, _owner: (owner as Owner)?.id } });
        })
      ).subscribe();
    }
  }

  createLodger(estate?: Estate) {
    this.store.dispatch({ type: '[Lodgers] Toogle Create Lodger Modal', visible: true });
    if (estate) {
      this.actions$.pipe(
        ofType('[Lodgers] Add Lodger Success'),
        take(1),
        tap(({ lodger }) => {
          this.store.dispatch({ type: '[Lodgers] Update Lodger Estate', lodger: { id: (lodger as Lodger)?.id, _estate: estate?.id } });
        })
      ).subscribe();
    }
  }

  setLodger(estate: Estate | null, lodger: Lodger) {
    this.selectedEstate = estate;
    const newLodger = { ...lodger, _estate: estate?.id ? estate.id : null };
    this.store.dispatch({ type: '[Lodgers] Update Lodger Estate', lodger: newLodger });
  }

  setOwner(estate: Estate, owner: Owner | null) {
    this.selectedEstate = estate;
    const newEstate = { id: estate.id, _owner: owner?.id ? owner.id : null };
    this.store.dispatch({ type: '[Estates] Edit Estate', estate: newEstate })
  }

  removeLodger(estate: Estate) {
    this.selectedEstate = estate;
    const lodger = estate.lodger;
    if (lodger) {
      this.store.dispatch({ type: '[Lodgers] Update Lodger Estate', lodger: { id: lodger.id, _estate: null } });
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
