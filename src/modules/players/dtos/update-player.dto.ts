// Validation
import { IsInt, IsString, IsDate, IsInstance, IsEnum, IsOptional } from 'class-validator';
// Types
import { URL, ID } from "src/types";
// Enums
import { Foot } from "src/shared/enums";
// Models
import { City } from 'src/shared/models/city.model';
import { Country } from 'src/shared/models/country.model';
import { Position } from '../models/position.model';


export class UpdatePlayerDto {

    @IsOptional()
    @IsString()
    readonly name?: string;

    @IsOptional()
    @IsString()
    readonly surname?: string;

    @IsOptional()
    @IsString()
    readonly date_of_birth?: string;

    @IsOptional()
    @IsInt()
    readonly place_of_birth_id?: ID;

    @IsOptional()
    @IsInt()
    readonly country_id?: ID;

    @IsOptional()
    @IsInt()
    readonly citizenship_id?: ID;

    @IsOptional()
    @IsInt()
    readonly position_id?: ID;

    @IsOptional()
    @IsEnum(Foot)
    readonly foot?: Foot;

    @IsOptional()
    @IsInt()
    readonly height?: number;

    @IsOptional()
    @IsInt()
    readonly weight?: number;

    @IsOptional()
    @IsString()
    readonly debut?: string;

    @IsOptional()
    @IsString()
    readonly description?: string;

    @IsOptional()
    @IsString()
    readonly profile_image?: URL;

    @IsOptional()
    @IsString()
    readonly cover_image?: URL;

}