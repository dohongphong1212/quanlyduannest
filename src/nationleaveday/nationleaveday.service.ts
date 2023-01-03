import { ForbiddenException, Injectable } from '@nestjs/common';
import { empty } from '@prisma/client/runtime';
import { count } from 'console';
import { response } from 'express';
import { from } from 'rxjs';
import { PrismaService } from 'src/prisma/prisma.service';
import { nationDTO } from './dto';

@Injectable()
export class NationleavedayService {
    constructor(private prisma: PrismaService) { }
    async getAll(name: string) {
        // var list = this.prisma.national_leave_day.findMany()
        if (name) {
            var list = await this.prisma.national_leave_day.findMany({
                where: {
                    content: {
                        contains: name,
                    }
                }
            });
        } else {
            var list = await this.prisma.national_leave_day.findMany({});
        }
        return list;
    }

    async create(createDTO: nationDTO) {
        const from =  createDTO.from.toString();
        const to =  createDTO.to.toString();
        if (Date.parse(to) - Date.parse(from)<0) {
            throw new ForbiddenException('ngày bắt đầu phải nhỏ hơn hoặc bằng ngày kết thúc');
        }
        let status = await this.checkExist(createDTO);
        if(status = false) throw new ForbiddenException('ngày nghỉ đã được cài đặt');
        try{
            const newReCord = await this.prisma.national_leave_day.create({
                data:{
                    content: createDTO.content,
                    from: new Date(createDTO.from),
                    to: new Date(createDTO.to),
                    markSalary:createDTO.markSalary
                },
                select:{
                    content:true,
                    from:true,
                    to: true,
                    markSalary: true,
                }
            });
            return {
                "status": true,
                "message": " Create Successful ",
                "data": newReCord,
            }
        }catch(error){
            return error;
        }
    }

    async update(id: number,create:nationDTO) {
        const from =  create.from.toString();
        const to =  create.to.toString();
        if (Date.parse(to) - Date.parse(from)<0) {
            throw new ForbiddenException('ngày bắt đầu phải nhỏ hơn hoặc bằng ngày kết thúc');
        }
        let status = await this.checkExist(create);
        if(status = false) throw new ForbiddenException('ngày nghỉ đã được cài đặt');
       try{
        const updated = await this.prisma.national_leave_day.update({
            where: {
              Id: Number(id),
            },
            data:{
                content: create.content,
                from: new Date(create.from),
                to: new Date(create.to),
                markSalary:create.markSalary
            },
          });
          if (!updated) throw new ForbiddenException('ID không tồn tại');
          return updated;
       }
       catch(error){
            return error;
       }
          
    }

    async checkExist(createDTO: nationDTO) {
        const from = new Date(createDTO.from);
        const to = new Date(createDTO.to);
        const check = await this.prisma.$queryRaw`select * from National_leave_day where (date("from") <= ${from} and date("to")>= ${from}) or (date("from") <= ${to} and date("to")>= ${to}) or
		(date("from") >= ${from} and date("to") <= ${to}) or (date("from")=${from}) or (date("from")=${to}) or (date("from") between ${from} and ${to})`;
        const data = Object.keys(check).length;
        if(data > 0){
            return false;
        } 
        else{
            return true;
        }
        // // national_leave_day.findMany({
        // //     where: {
        // //         OR: [
        // //             {
        // //                 from: {
        // //                     lte: new Date(createDTO.from)
        // //                 },
        // //                 to:{
        // //                     gte: new Date(createDTO.from)
        // //                 }
        // //             },
        // //             {
        // //                 from: {
        // //                     lte: new Date(createDTO.to)
        // //                 },
        // //                 to:{
        // //                     gte: new Date(createDTO.to)
        // //                 }
        // //             },
        // //             {
        // //                 from: {
        // //                     gte: new Date(createDTO.from)
        // //                 },
        // //                 to:{
        // //                     lte: new Date(createDTO.to)
        // //                 }
        // //             },
        // //             {
        // //                 from: new Date(createDTO.from)
        // //             },
        // //             {
        // //                 to:new Date(createDTO.to)
        // //             }
        // //         ],  
        // //     },
        // })
        // return check;
    }

    async remove(id: number) {
        const natinal_day = await this.prisma.national_leave_day.delete({
            where: {
                Id: id,
            }
        });
        if (!natinal_day) throw new ForbiddenException('ID không tồn tại');
        return {
            message: 'Đã xóa thành công!',
        };
    }
}

