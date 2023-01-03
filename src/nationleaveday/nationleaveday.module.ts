import { Module } from '@nestjs/common';
import { NationleavedayController } from './nationleaveday.controller';
import { NationleavedayService } from './nationleaveday.service';

@Module({
  controllers: [NationleavedayController],
  providers: [NationleavedayService]
})
export class NationleavedayModule {}
