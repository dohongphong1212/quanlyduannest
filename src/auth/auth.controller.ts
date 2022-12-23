import { Body, Controller, Post,HttpCode, HttpStatus } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { AuthDTO } from "./dto";
import { RegisterDTO } from "./dto/regsiter.dto";
@Controller('auth')
export class AuthController{
    constructor(private authService:AuthService) {}

    @HttpCode(HttpStatus.OK)
    @Post("register")
    register(@Body() regist:RegisterDTO){
        return this.authService.register(regist);
    }

    @Post("login")
    login(@Body() dto:AuthDTO){
        return this.authService.login(dto);
    }
}