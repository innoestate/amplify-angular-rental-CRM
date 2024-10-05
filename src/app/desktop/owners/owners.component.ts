import { Component, OnInit } from '@angular/core';
import { Owner } from '../../core/models/owner.model';
import { delay, map, Observable, take, tap } from 'rxjs';
import { Store } from '@ngrx/store';
import { selectOwners, loadingOwners } from '../../core/store/owners.selectors';
import { OwnersService } from '../../core/services/owners.service';
import { loadOwners } from '../../core/store/owners.actions';

@Component({
  selector: 'app-owners',
  templateUrl: './owners.component.html',
  styleUrl: './owners.component.less'
})
export class OwnersComponent implements OnInit{

  owners$: Observable<Owner[]> = this.store.select(selectOwners);
  loading$: Observable<boolean> = this.store.select(loadingOwners);

  constructor(private store: Store, public service: OwnersService) {
    this.store.dispatch({ type: '[Owners] Load Owners' });
  }

  ngOnInit() {
    // this.owners$ = this.service.getOwners2(1).pipe(
    //   map(owners => owners.items as any),
    //   tap(owners => {
    //     // this.store.dispatch(loadOwners({ owners }));
    //   })
    // );
  }

  createOwner() {
    this.store.dispatch({ type: '[Owners] Toogle Create Owner Modal', visible: true });
  }

  deleteOwner(owner: Owner) {
    this.store.dispatch({ type: '[Owners] Delete Owner', ownerId: owner.id! });
  }

}
