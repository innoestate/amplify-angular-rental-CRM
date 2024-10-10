import { Lodger } from '../models/lodger.model';
import { Estate } from '../models/estate.model';

export const setLodgerToEstate = (lodger: Lodger, lodgers: Lodger[] ) => {
  const lodgersToUpdate: any[] = lodgers.filter(lodger_ => lodger.id !== lodger_.id && lodger._estate === lodger_._estate).map(lodger => ({...lodger, _estate: null}))
  return [lodger, ...lodgersToUpdate];
}

export const setLodgerDefaultAddress = (lodger: Lodger, estate: Estate) => {
  return {
    ...lodger,
    _street: lodger._street??estate._street,
    _zip: lodger._zip??estate._zip,
    _city: lodger._city??estate._city
  }
}
