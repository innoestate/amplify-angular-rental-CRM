import { Lodger } from '../models/lodger.model';

export const setLodgerToEstate = (lodger: Lodger, lodgers: Lodger[] ) => {
  const lodgersToUpdate: any[] = lodgers.filter(lodger_ => lodger.id !== lodger_.id && lodger._estate === lodger_._estate).map(lodger => ({...lodger, _estate: null}))
  return [lodger, ...lodgersToUpdate];

}
