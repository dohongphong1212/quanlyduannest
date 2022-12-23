import { Controller, Get, UseGuards } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { JwtGuard } from "./guard/auth.guard";

@Controller('user')
export class UserController{
    constructor(private prisma:PrismaService){

    }

    @Get('list-user')
    @UseGuards(JwtGuard)
    findAll(){
        return "nhin cai con cac";
    }
}