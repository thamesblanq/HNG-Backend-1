import { IsNotEmpty, IsInt } from 'class-validator';

export class ClassifyNumberDto {
  @IsNotEmpty({ message: 'Number is required' })
  @IsInt({ message: 'Number must be an integer' })
  number!: number;
}
