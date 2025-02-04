import { Module } from '@nestjs/common';
import { NumberService } from './number.service';
import { NumberController } from './number.controller';
import { HttpModule } from '@nestjs/axios';
import { CacheModule } from '@nestjs/cache-manager';

@Module({
  imports: [HttpModule, CacheModule.register()],
  controllers: [NumberController],
  providers: [NumberService],
})
export class NumberModule {}
