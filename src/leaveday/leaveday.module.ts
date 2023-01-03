import { Module } from '@nestjs/common';
import { LeavedayController } from './leaveday.controller';
import { LeavedayService } from './leaveday.service';

@Module({
  controllers: [LeavedayController],
  providers: [LeavedayService]
})
export class LeavedayModule {}
