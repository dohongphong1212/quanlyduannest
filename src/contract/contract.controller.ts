import { Controller, Delete, Get, Post, Put } from '@nestjs/common';
import { ContractService } from './contract.service';

@Controller('contract')
// @UseGuards(JwtGuard, RolesGuard)
// @Roles(Role.Admin)
export class ContractController {
    constructor(private contract: ContractService){ }

    // @Get('all')
    // getAll(){
    //     return this.contract.getAll();
    // }
    // @Post('create')
    // create(){
    //     return this.contract.create();
    // }
    // @Put('update')
    // update(){
    //     return this.contract.update();
    // }

    // @Delete('delete')
    // remove(){
    //     return this.contract.remove();
    // }
}
