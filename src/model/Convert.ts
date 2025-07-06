import { IsString, Matches, MaxLength } from "class-validator";

export class Convert {
    @IsString()
    @Matches(/^[1-9]\d+$/, { message: 'solo números positivos y enteros en el monto'})
    readonly amount: string

    @IsString()
    @MaxLength(3, {message: 'Formato de divisa incorrecta'})
    @Matches(/^[A-Z]+$/, { message: 'La divisa FROM debe ser solo en letras mayúsculas y valida'})
    readonly from: string

    @IsString()
    @MaxLength(3, {message: 'Formato de divisa incorrecta'})
    @Matches(/^[A-Z]+$/, { message: 'La divisa TO debe ser solo en letras mayúsculas y valida'})
    readonly to: string
}