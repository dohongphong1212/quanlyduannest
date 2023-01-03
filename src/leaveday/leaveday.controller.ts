import { Body, Controller, Delete, Get, Param, Post, Put, Query, UseGuards } from '@nestjs/common';
import { nationDTO } from 'src/nationleaveday/dto';
import { JwtGuard } from 'src/user/guard/auth.guard';
import { LeavedayService } from './leaveday.service';

@Controller('leaveday')
@UseGuards(JwtGuard)

export class LeavedayController {
    constructor(private leaveday:LeavedayService){}
    @Get("all")
    getAll(@Query('name') name:string){
        return this.leaveday.getAll(name);
    }

    @Post("create")
    create(@Body() create: nationDTO){
        return this.leaveday.create(create);
    }

    @Put("update/:id")
    update(@Param('id') id: number ,@Body() create: nationDTO){
        return this.leaveday.update(id,create);
    }

    @Delete(':id')
    remove(@Param('id') id: number) {
        return this.leaveday.remove(id);
      }

}
