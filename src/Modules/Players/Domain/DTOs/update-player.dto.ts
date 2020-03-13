// Validation
import { IsInt, IsString, IsDate, IsInstance, IsEnum } from 'class-validator';
// Types
import { URL } from "src/types";
// Enums
import { Foot } from "src/Shared/Enums";
// Models
import { City } from 'src/Shared/Models/city.model';
import { Country } from 'src/Shared/Models/country.model';
import { Position } from '../Models/position.model';


export class UpdatePlayerDto {

    @IsString()
    readonly name: string;

    @IsString()
    readonly surname: string;

    @IsDate()
    readonly date_of_birth?: Date;

    @IsInstance(City)
    readonly place_of_birth?: City;

    @IsInstance(Country)
    readonly country?: Country;

    @IsInstance(Country)
    readonly citizenship?: Country;

    @IsEnum(Foot)
    readonly foot?: Foot;

    @IsInt()
    readonly height?: number;

    @IsInt()
    readonly weight?: number;

    @IsDate()
    readonly debut?: Date;

    @IsString()
    readonly description?: string;

    @IsString()
    readonly profile_image?: URL;

    @IsString()
    readonly cover_image?: URL;

    @IsInstance(Position)
    readonly position?: Position;

}