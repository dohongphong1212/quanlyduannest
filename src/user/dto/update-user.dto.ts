import { IsEmail, IsString } from "class-validator";

export class UpdateUserDTO{
    constructor(){
        
    }
    @IsString()
    username: string;

    @IsString()
    password:string;

    @IsString()
    @IsEmail()
    email:string;

    @IsString()
    firstName:string;

    @IsString()
    lastName:string;

}