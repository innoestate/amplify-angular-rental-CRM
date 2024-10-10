import { Estate } from "../models/estate.model";
import { Lodger } from "../models/lodger.model";
import { Owner } from "../models/owner.model";


export const formatEstates = (estates: Estate[], owners: Owner[], lodgers: Lodger[]): Estate[] => {
  const formatedEstates: any[] = [];

  estates.forEach(estate => {
    const owner = owners.find(owner => owner.id === estate._owner);
    const lodger = lodgers.find(lodger => lodger._estate === estate.id);
    formatedEstates.push({...estate, owner, lodger});
  });

  return formatedEstates;
}

export const setOwner = (estate: Estate, owners: Owner[]): Estate => {
  const owner = owners.find(owner => owner.id === estate._owner);
  return {...estate, owner: owner};
}

export const formatEstate = (estate: Estate) => {
    return ({...estate, address: estate._street + ' ' + estate._zip + ' ' + estate._city, city: estate._zip + ' ' + estate._city});
}
