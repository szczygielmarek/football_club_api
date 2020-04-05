// Validation
import { IsInt, IsString, IsEnum, IsOptional } from 'class-validator';
// Types
import { URL, ID } from "src/types";
// Enums
import { Foot } from "../../../shared/enums";


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