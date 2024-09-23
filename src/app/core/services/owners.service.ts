import { Injectable } from '@angular/core';
import { delay, Observable, of } from 'rxjs';
import { ownersMock } from '../mocks/owners.mock';
import { Owner } from '../models/owner.model';

@Injectable({
  providedIn: 'root'
})
export class OwnersService {

  constructor() { }

  getOwners(userId: number): Observable<Owner[]> {
    return of(ownersMock).pipe(
      delay(1000)
    );
  }

}
