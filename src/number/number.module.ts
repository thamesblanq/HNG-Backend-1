import { Module } from '@nestjs/common';
import { NumberService } from './number.service';
import { NumberController } from './number.controller';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [HttpModule],
  controllers: [NumberController],
  providers: [NumberService],
})
export class NumberModule {}
