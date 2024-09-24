import { Injectable } from '@angular/core';
import { delay, from, map, Observable, of } from 'rxjs';
import { estates } from '../mocks/estates.mock';
import { Estate } from '../models/estate.model';
import { Schema } from '../../../../amplify/data/resource';
import { generateClient } from 'aws-amplify/api';

const client = generateClient<Schema>();

@Injectable({
  providedIn: 'root'
})
export class EstatesService {

  constructor() { }

  getEstates(): Observable<Estate[]> {
    return from(client.models.Estate.list()).pipe(
      map(result => (result.data as any))
    );
  }

  createEstate(estate: Estate): Observable<any> {
    return from(client.models.Estate.create(estate as any));
  }

  deleteEstate(estate: Estate): Observable<any> {
    return from(client.models.Estate.delete({ id: estate.id! }));
  }
}
