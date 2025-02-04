import { Controller, Get, Query, BadRequestException } from '@nestjs/common';
import { NumberService } from './number.service';

@Controller('api')
export class NumberController {
  constructor(private readonly numberService: NumberService) {}

  @Get('classify-number')
  async classifyNumber(@Query('number') numberParam: string) {
    // Check if the input is a valid number and an integer
    const parsedNumber = parseFloat(numberParam);

    if (isNaN(parsedNumber) || numberParam.includes('.')) {
      throw new BadRequestException({
        number: "alphabet",
        error: true,
      });
    }

    // Parse the number as an integer for further processing
    const number = parseInt(numberParam, 10);

    return this.numberService.classifyNumber(number);
  }
}