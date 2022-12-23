import { Body, ForbiddenException, Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { AuthDTO } from "./dto";
import * as argon from 'argon2';
import { RegisterDTO } from "./dto/regsiter.dto";
import console from "console";
import { JwtService } from "@nestjs/jwt";
import { ConfigService } from "@nestjs/config";
import { Role } from "@prisma/client";
@Injectable()
export class AuthService {

    constructor(
        private prismaService: PrismaService,
        private jwtService: JwtService,
        private config: ConfigService,
    ) { }

    async register(regist: RegisterDTO) {
        const password = await argon.hash(regist.password)
        try {
            const user = await this.prismaService.user.create({
                data: {
                    username: regist.username,
                    password: password,
                    email: regist.email,
                    firstName: regist.firstName,
                    lastName: regist.lastName,
                },
                select: {
                    username: true,
                    email: true,
                    firstName: true,
                    lastName: true,
                    createdAt: true,
                }
            });
            return user;
        } catch (error) {
            if (error.code == 'P2002') {
                throw new ForbiddenException('username or email has exsited');
            }
        }
    }

    async login(dto: AuthDTO) {
        const user = await this.prismaService.user.findUnique({
            where: {
                username: dto.username,
            },
        });
        if (!user) throw new ForbiddenException('Tài khoản hoặc mật khẩu không chính xác');

        const pwMatches = await argon.verify(user.password, dto.password);
        if (!pwMatches) throw new ForbiddenException('Tài khoản hoặc mật khẩu không chính xác');
        return this.loginToken(user.Id, user.username, user.email, user.role);
    }

    async loginToken(Id: number, username: string, email: string, role: Role): Promise<{
        user: { Id: number; username: string; email: string; role: Role };
        access_token: string;
    }> {
        const paload = {
            Id: Id,
            username,
            role,
            email,
        };
        const secret = this.config.get('JWT_SECRET');
        const token = await this.jwtService.signAsync(paload, {
            expiresIn: '30h',
            secret: secret,
        });
        return {
            user: {
                Id,
                username,
                email,
                role,
            },
            access_token: token,
        };
    }
}