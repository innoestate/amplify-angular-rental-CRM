import { Lodger } from "./lodger.model";
import { Owner } from "./owner.model";

export interface Estate {
    id?: string;
    _street: string;
    _city: string;
    _zip: string;
    _rent: number;
    _charges: number;
    _owner: string;
    _logger?: string;
    _parcel?: string;
    address?: string;
    city?: string;
    owner?: Owner;
    lodger?: Lodger;
}
