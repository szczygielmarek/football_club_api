// TYPES
import { ID } from '../../types';
// MODELS
import { Country } from './country.model';


export class City {

    /** 
     * @prop {ID} id 
     **/
    id: ID;

    /** 
     * @prop {string} name 
     **/
    name: string;

    /** 
     * @prop {Country} country 
     **/
    country: Country;

}