import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Estate } from '../core/models/estate.model';
import { selectOwners } from '../owners/store/owners.selectors';
import { loadEstates } from './store/estates.actions';
import { loadingEstates, selectEstates } from './store/estates.selectors';


@Component({
  selector: 'app-estates',
  templateUrl: './estates.component.html',
  styleUrl: './estates.component.less'
})
export class EstatesComponent implements OnInit {

  estates$: Observable<Estate[] | null> = this.store.select(selectEstates);
  loading$: Observable<boolean> = this.store.select(loadingEstates);
  owners$: Observable<any> = this.store.select(selectOwners);

  constructor(private store: Store){

  }

  ngOnInit(): void {
    this.store.dispatch(loadEstates({ userId: 1 }));
    this.store.dispatch({ type: '[Owners] Load Owners' });
  }

  createEstate(){
    this.store.dispatch({ type: '[Estates] Toogle Create Estate Modal', visible: true });
    // const estate: Estate = {
    //   _street: 'Street 1',
    //   _city: 'City 1',
    //   _zip: 'Zip 1',
    //   _rent: 1000,
    //   _charges: 100,
    //   _owner: 'Owner 1'
    // };
    // this.store.dispatch({ type: '[Estates] Create Estate', estate });
  }

  deleteEstate(estate: Estate){
    this.store.dispatch({ type: '[Estates] Delete Estate', estate });
  }

}
