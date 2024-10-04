import { Injectable } from '@angular/core';
import { delay, from, map, Observable, of, take, tap } from 'rxjs';
import { estates } from '../mocks/estates.mock';
import { Estate } from '../models/estate.model';
import { Schema } from '../../../../amplify/data/resource';
import { generateClient } from 'aws-amplify/api';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Owner } from '../models/owner.model';
import { Lodger } from '../models/lodger.model';

const client = generateClient<Schema>();

@Injectable({
  providedIn: 'root'
})
export class EstatesService {

  constructor(private http: HttpClient) { }

  generateRentreceiptAsPdf(owner: Owner, lodger: Lodger, estate: Estate): void {



    // const headers = new HttpHeaders({
    //   //'Content-Type':  'application/json',
    //   'Access-Control-Allow-Headers': 'Content-Type',
    //   'Access-Control-Allow-Methods': 'GET',
    //   'Access-Control-Allow-Origin': '*'
    // })

    // this.http.get('https://gjwqizx5gjum6zy2ofaum4526a0xjlfu.lambda-url.eu-west-3.on.aws/').pipe(
    //   tap(result => {
    //     console.log('result', result);
    //     this.savePdfFile((result as any), 'quittance.pdf');
    //   })
    // ).pipe(
    //   // take(1)
    // ).subscribe();

    // Prepare the body in x-www-form-urlencoded format
    const body = new HttpParams()
      .set('ownerName', owner._name)
      .set('ownerStreet', owner._street)
      .set('ownerCity', owner._zip + ' ' + owner._city)
      .set('lodgerName', lodger._name)
      .set('lodgerStreet', lodger._street)
      .set('lodgerCity', lodger._zip + ' ' + lodger._city)
      .set('address', estate.address ?? '')
      .set('rent', estate._rent)
      .set('charges', estate._charges);

    // Set headers
    const headers = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded',
    });

    this.http.post('https://xh5vncrl99.execute-api.eu-west-3.amazonaws.com/default/generateRentReceipt', body.toString(), { headers, responseType: 'blob'  }).pipe(
      tap(result => {
        this.savePdfFile((result as any), 'quittance.pdf');
      })
    ).pipe(
      take(1)
    ).subscribe();

  }

  savePdfFile(pdfData: ArrayBuffer, filename: string): void {
    const blob = new Blob([pdfData], { type: 'application/pdf' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    a.click();
    URL.revokeObjectURL(url);
  }

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
        return { ...estate, ...(result.data as any), _owner: estate._owner };
      })
    )
  }

  deleteEstate(estate: Estate): Observable<any> {
    return from(client.models.Estate.delete({ id: estate.id! }));
  }
}
