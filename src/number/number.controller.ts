import { Controller, Get, Query, BadRequestException } from '@nestjs/common';
import { NumberService } from './number.service';

@Controller('api')
export class NumberController {
  constructor(private readonly numberService: NumberService) {}

  @Get('classify-number')
  async classifyNumber(@Query('number') numberParam: string) {
    const number = parseInt(numberParam, 10);

    if (isNaN(number)) {
      throw new BadRequestException({
        number: numberParam,
        error: true,
      });
    }

    return this.numberService.classifyNumber(number);
  }
}
