import { IsNotEmpty, IsString, Matches } from "class-validator";

export class CrazyNumbers{
    @IsString()
    @IsNotEmpty()
    @Matches(/^\d+$/, { message: 'first, solo números positivos y enteros'})
    readonly first: string;

    @IsString()
    @IsNotEmpty()
    @Matches(/^\d+$/, { message: 'second, solo números positivos y enteros'})
    readonly second: string;
}