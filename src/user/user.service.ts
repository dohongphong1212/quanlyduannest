import { ForbiddenException, Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { UpdateUserDTO } from "./dto/update-user.dto";
import * as argon from 'argon2';

@Injectable()
export class UserService {
    constructor(private prisma: PrismaService) { }

    async findAll(name: string) {
        // const totalRecord = await this.prisma.user.count();
        if (name) {
            var userList = await this.prisma.user.findMany({
                where: {
                    username: {
                        contains: name,
                    }
                }
            });
        } else {
            var userList = await this.prisma.user.findMany({});
        }
        if (userList.length > 0) {
            userList.forEach((element) => {
                delete element.password;
            });
        }
        let response = {
            data: userList,
            paging: {//   pageSize: pageSize,//   pageIndex: pageIndex,// totalRecord: totalRecord,
            },
        };
        return response;
    }

    async update(id: number, updateUser: UpdateUserDTO) {
        const password = await argon.hash(updateUser.password)
        try {
            const update = await this.prisma.user.update({
                where: {
                    Id: id,
                },
                data: {
                    username: updateUser.username,
                    password: password,
                    email: updateUser.email,
                    firstName: updateUser.firstName,
                    lastName: updateUser.lastName,
                },
            })
            if (update) {
                return {
                    'status': true,
                    'message': 'Update data successfull!'
                }
            }
        }
        catch (error) {
            return error;
        }
    }

    async delete(id: number) {
        try {
            const deleteUser = await this.prisma.user.delete({
                where: {
                    Id: id,
                },
            })
        }
        catch (error) {
            return error;
        }
    }
}