import { Injectable } from '@angular/core';
import { delay, from, map, Observable, of, take, tap } from 'rxjs';
import { ownersMock } from '../mocks/owners.mock';
import { Owner } from '../models/owner.model';
import { Schema } from '../../../../amplify/data/resource';
import { generateClient } from 'aws-amplify/api';
import { result } from 'lodash';

const client = generateClient<Schema>();

@Injectable({
  providedIn: 'root'
})
export class OwnersService {

  constructor() { }

  getOwners(userId: number): Observable<any> {
   return from(client.models.Owner.list()).pipe(
    map(result => result.data)
   )
  }

  createOwner(owner: Owner): Observable<any> {
    return from(client.models.Owner.create(owner as any));
    try {
    } catch (error) {
      console.error('error creating owner', error);
    }
  }

}
