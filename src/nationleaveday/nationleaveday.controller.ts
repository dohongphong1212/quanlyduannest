import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Post, Put, Query, UseGuards } from '@nestjs/common';
import { create } from 'domain';
import { Roles } from 'src/auth/decorator/role.decorator';
import { JwtGuard } from 'src/user/guard/auth.guard';
import { RolesGuard } from 'src/user/guard/role.guard';
import Role from 'src/user/role/role.enum';
import { nationDTO } from './dto';
import { NationleavedayService } from './nationleaveday.service';

@UseGuards(JwtGuard, RolesGuard)
@Roles(Role.Admin)
@Controller('national-leaveday')
export class NationleavedayController {
    constructor(private national:NationleavedayService){}
    @Get("all")
    getAll(@Query('name') name:string){
        return this.national.getAll(name);
    }

    @Post("create")
    create(@Body() create: nationDTO){
        return this.national.create(create);
    }

    @Put("update/:id")
    update(@Param('id') id: number ,@Body() create: nationDTO){
        return this.national.update(id,create);
    }

    @Delete(':id')
    remove(@Param('id') id: number) {
        return this.national.remove(id);
      }

}
