import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { Lodger } from '../core/models/lodger.model';
import { loadingLodgers, selectLodgers } from './store/lodgers.selectors';
import { LodgersService } from '../core/services/lodgers.service';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-loggers',
  templateUrl: './loggers.component.html',
  styleUrl: './loggers.component.less'
})
export class LoggersComponent {

  lodgers$: Observable<Lodger[]> = this.store.select(selectLodgers);
  loading$: Observable<boolean> = this.store.select(loadingLodgers);

  constructor(private store: Store, public service: LodgersService) {
    this.store.dispatch({ type: '[Lodgers] Load Lodgers' });
  }

  createLodger() {
    this.store.dispatch({ type: '[Lodgers] Toogle Create Lodger Modal', visible: true });
  }

  deleteLodger(Lodger: Lodger) {
    this.store.dispatch({ type: '[Lodgers] Delete Lodger', LodgerId: Lodger.id! });
  }
}
