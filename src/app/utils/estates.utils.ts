import { Estate } from "../models/estate.model";

export const formatEstate = (estate: Estate) => {
    return ({...estate, address: estate._street + ' ' + estate._zip + ' ' + estate._city, city: estate._zip + ' ' + estate._city});
}