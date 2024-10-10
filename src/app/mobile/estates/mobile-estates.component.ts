import { Component } from '@angular/core';
import { EstatesComponent } from '../../core/common/estates.component';
import { Store } from '@ngrx/store';
import { EstatesService } from '../../core/services/estates.service';
import { Actions } from '@ngrx/effects';

@Component({
  selector: 'app-mobile-estates',
  templateUrl: './mobile-estates.component.html',
  styleUrl: './mobile-estates.component.less'
})
export class MobileEstatesComponent extends EstatesComponent {

  constructor(store: Store, actions$: Actions, estateService: EstatesService) {
    super(store, actions$, estateService);
  }

}
