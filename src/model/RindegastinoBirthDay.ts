import { IsNotEmpty, IsString, Matches } from "class-validator";
import { Expose } from "class-transformer";

export class RindegastinoBirthDay{
    @IsNotEmpty()
    @IsString()
    readonly name: string

    @IsNotEmpty()
    @Matches(/^\d{2}-\d{2}-\d{4}$/,{ message: 'El formato de fecha valido es DD-MM-YYYY'})
    readonly birthday: string
}

export class ValidDate{
    @Expose({ name: 'birthdate' })
    @IsNotEmpty()
    @Matches(/^\d{2}-\d{2}-\d{4}$/,{ message: 'El formato de fecha valido es DD-MM-YYYY'})
    readonly birthdate: string
}