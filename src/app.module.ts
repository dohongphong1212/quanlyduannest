import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { PrismaModule } from './prisma/prisma.module';
import { ConfigModule } from '@nestjs/config';
import { NationleavedayModule } from './nationleaveday/nationleaveday.module';
import { LeavedayModule } from './leaveday/leaveday.module';
import { ContractModule } from './contract/contract.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal:true
    }),
    AuthModule,
    UserModule,
    PrismaModule,
    NationleavedayModule,
    LeavedayModule,
    ContractModule
  ],
  providers: [],
})
export class AppModule { }
