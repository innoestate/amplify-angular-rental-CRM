import { Injectable } from '@angular/core';
import { delay, Observable, of } from 'rxjs';
import { estates } from '../mocks/estates.mock';
import { Estate } from '../models/estate.model';

@Injectable({
  providedIn: 'root'
})
export class EstatesService {

  constructor() { }

  getEstates(userId: number): Observable<Estate[]> {
    return of(estates).pipe(
      delay(1000)
    );
  }

}
