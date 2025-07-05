import { IsString, Matches, MaxLength, ValidationArguments } from "class-validator";

export class Convert {
    @IsString()
    @Matches(/^[1-9]\d+$/, { message: 'solo números positivos en el monto'})
    readonly amount: string

    @IsString()
    @MaxLength(3, {message: 'Formato de divisa incorrecta'})
    @Matches(/^[A-Z]+$/, { message: 'La divisa FROM debe ser solo en letras mayúsculas'})
    readonly from: string

    @IsString()
    @MaxLength(3, {message: 'Formato de divisa incorrecta'})
    @Matches(/^[A-Z]+$/, { message: 'La divisa TO debe ser solo en letras mayúsculas'})
    readonly to: string
}