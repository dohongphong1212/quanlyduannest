import { Type } from "class-transformer";
import { IsBoolean, IsDate, IsEmail, IsNotEmpty, IsString } from "class-validator";

export class nationDTO{
    @IsString()
    @IsNotEmpty()
    content: string;

    @IsDate()
    @Type(() => Date)
    @IsNotEmpty()
    from: Date;

    @IsDate()
    @Type(() => Date)
    @IsNotEmpty()
    to: Date;

    @IsBoolean()
    @IsNotEmpty()
    markSalary: boolean
}