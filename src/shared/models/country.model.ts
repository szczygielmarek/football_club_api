// Types
import { ID, URL } from '../../types';


export class Country {

    /** 
     * @prop {ID} id 
     **/
    id: ID;

    /** 
     * @prop {string} name 
     **/
    name: string;

    /** 
     * @prop {URL} image 
     **/
    image?: URL

}