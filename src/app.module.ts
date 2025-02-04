import { Module } from '@nestjs/common';
import {HttpModule} from '@nestjs/axios';
import { NumberModule } from './number/number.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [NumberModule, HttpModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
