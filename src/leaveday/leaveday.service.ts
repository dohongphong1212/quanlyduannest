import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class LeavedayService {
    constructor(private prisma:PrismaService){}

    
}
