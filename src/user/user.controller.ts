import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Patch, Post, Put, Query, Req, UseGuards } from "@nestjs/common";
import { Request } from "express";
import { Roles } from "src/auth/decorator/role.decorator";
import { PrismaService } from "src/prisma/prisma.service";
import { PagingDto } from "./dto/paging.dto";
import { UpdateUserDTO } from "./dto/update-user.dto";
import { JwtGuard } from "./guard/auth.guard";
import { RolesGuard } from "./guard/role.guard";
import Role from "./role/role.enum";
import { UserService } from "./user.service";

@UseGuards(JwtGuard, RolesGuard)
@Roles(Role.Admin)
@Controller('user')
export class UserController {
    constructor(private userService: UserService,) { }
    
    @HttpCode(HttpStatus.OK)
    @Get('list-user')
    findAll(@Query('name') name: string) {
        return this.userService.findAll(name);
    }

    @Put(':id')
    update(@Param('id') id: number , @Body() updateUser: UpdateUserDTO){
        return this.userService.update(+id, updateUser);
    }

    @Delete(':id')
    delete(@Param('id') id:number){
        return this.userService.delete(+id);
    }
}