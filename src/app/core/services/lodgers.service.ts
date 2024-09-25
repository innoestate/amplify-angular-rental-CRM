import { Injectable } from '@angular/core';
import { generateClient } from 'aws-amplify/api';
import { from, map, Observable } from 'rxjs';
import { Schema } from '../../../../amplify/data/resource';
import { Lodger } from '../models/lodger.model';

const client = generateClient<Schema>();

@Injectable({
  providedIn: 'root'
})
export class LodgersService {

  constructor() { }

  getLodgers(): Observable<any> {
    return from(client.models.Lodger.list()).pipe(
      map(result => result.data)
    )
  }

  createLodger(lodger: Lodger): Observable<any> {
    return from(client.models.Lodger.create(lodger as any));
  }

  deleteLodger(lodgerId: string): Observable<any> {
    const readOnlyId = '' + lodgerId;
    return from(client.models.Lodger.delete({ id: readOnlyId })).pipe(
      map(result => result.data)
    )
  }

}
