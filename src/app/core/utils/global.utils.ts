import { Estate } from "../models/estate.model";
import { Lodger } from "../models/lodger.model";
import { Owner } from "../models/owner.model";

export const formatObjectAddress = (obj: Estate | Owner | Lodger) => {
  return ({...obj, address: (obj._street || obj._city || obj._zip) ? obj._street??'' + ' ' + obj._zip??'' + ' ' + obj._city??'' : '', city: obj._zip??'' + ' ' + obj._city??''});
}

export const formatObjectsAddress = (objs: Estate[] | Owner[] | Lodger[]) => {
  return objs.map(obj => formatObjectAddress(obj));
}
