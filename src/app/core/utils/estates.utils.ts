import { Estate } from "../models/estate.model";
import { Owner } from "../models/owner.model";


export const formatEstates = (estates: Estate[], owners: Owner[]): Estate[] => {
  const formatedEstates: any[] = [];

  estates.forEach(estate => {
    const owner = owners.find(owner => owner.id === estate._owner);
    formatedEstates.push({...estate, owner: owner});
  });

  return formatedEstates;
}

export const formatEstate = (estate: Estate) => {
    return ({...estate, address: estate._street + ' ' + estate._zip + ' ' + estate._city, city: estate._zip + ' ' + estate._city});
}
