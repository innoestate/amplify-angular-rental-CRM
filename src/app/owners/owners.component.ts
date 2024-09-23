import { Component } from '@angular/core';
import { Owner } from '../core/models/owner.model';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { selectOwners, loadingOwners } from './store/owners.selectors';

@Component({
  selector: 'app-owners',
  templateUrl: './owners.component.html',
  styleUrl: './owners.component.less'
})
export class OwnersComponent {

  owners$: Observable<Owner[]> = this.store.select(selectOwners);
  loading$: Observable<boolean> = this.store.select(loadingOwners);

  constructor(private store: Store) {
    this.store.dispatch({ type: '[Owners] Load Owners' });
  }

}
