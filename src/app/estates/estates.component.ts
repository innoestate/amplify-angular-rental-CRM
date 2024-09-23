import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Estate } from '../core/models/estate.model';
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

  constructor(private store: Store){

  }

  ngOnInit(): void {
    this.store.dispatch(loadEstates({ userId: 1 }));
  }

}
