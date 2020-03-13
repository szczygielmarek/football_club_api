// Validation
import { IsInt, IsString, IsDate, IsEnum } from 'class-validator';
// Types
import { ID, URL } from "src/types";
// Enums
import { Foot } from "src/Shared/Enums";


export class CreatePlayerDto {

    @IsString()
    readonly name: string;

    @IsString()
    readonly surname: string;

    @IsDate()
    readonly date_of_birth: Date;

    @IsInt()
    readonly country_id?: ID;

    @IsInt()
    readonly citizenship_id?: ID;

    @IsInt()
    readonly place_of_birth_id?: ID;

    @IsInt()
    readonly position_id?: ID;

    @IsDate()
    readonly debut?: Date;

    @IsString()
    readonly description?: string;

    @IsString()
    readonly profile_image?: URL;

    @IsString()
    readonly cover_image?: URL;

    @IsEnum(Foot)
    readonly foot?: Foot;

    @IsInt()
    readonly height?: number;

    @IsInt()
    readonly weight?: number;

}