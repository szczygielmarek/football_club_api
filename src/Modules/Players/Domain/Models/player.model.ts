// Types
import { ID, URL } from "src/types";
// Enums
import { Foot } from "src/Shared/Enums";
// Models
import { City } from "src/Shared/Models/city.model";
import { Country } from "src/Shared/Models/country.model";


/**
 * Player Model
 */
export class Player {

    /**
     * @prop {ID} id
     */
    id: ID;

    /**
     * @prop {string} name
     */
    name: string;

    /**
     * @prop {string} surname
     */
    surname: string;

    /**
     * @prop {string} date_of_birth
     */
    date_of_birth?: string;

    /**
     * @prop {City} place_of_birth
     */
    place_of_birth?: City;

    /**
     * @prop {Country} country
     */
    country?: Country;

    /**
     * @prop {Country} citizenship
     */
    citizenship?: Country;

    /**
     * @prop {Foot} foot
     */
    foot?: Foot;

    /**
     * @prop {number} height
     */
    height?: number;

    /**
     * @prop {number} weight
     */
    weight?: number;

    /**
     * @prop {string} debut
     */
    debut?: string;

    /**
     * @prop {string} description
     */
    description?: string;

    /**
     * @prop {URL} profile_image
     */
    profile_image?: URL;

    /**
     * @prop {URL} cover_image
     */
    cover_image?: URL;

    /**
     * @prop {Position} position
     */
    position?: Position;

}