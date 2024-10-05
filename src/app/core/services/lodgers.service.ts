import { Injectable } from '@angular/core';
import { generateClient } from 'aws-amplify/api';
import { from, map, Observable, tap } from 'rxjs';
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

  updateLodgers(lodgers: Lodger[]): Observable<any> {

    const updateManyLodgers = async (lodgers: Partial<Lodger>[]) => {

      let updatedLodgers: any = [];
      try {
        const promises = lodgers.map((lodger) => {
          const newLodger = {id: lodger.id, _estate: lodger._estate};
          return client.models.Lodger.update(newLodger as any);
        });
        updatedLodgers = (await Promise.all(promises)).map(result => result?.data);
      } catch (error) {
        console.error('Error updating lodgers:', error);
      }
      return updatedLodgers;
    };

    return from(updateManyLodgers(lodgers));
  }

}
