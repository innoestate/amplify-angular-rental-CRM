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
    return from(client.models.Estate.create(estate as any)).pipe(
      map(result => {
        if ((result as any)['errors']) {
          throw new Error('unknow error');
        }
        console.log('front estate', estate);
        console.log('ok', result);
        return { ...estate, ...(result.data as any), _owner: estate._owner };
      })
    )
  }

  deleteEstate(estate: Estate): Observable<any> {
    return from(client.models.Estate.delete({ id: estate.id! }));
  }
}
