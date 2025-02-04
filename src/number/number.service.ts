import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { AxiosResponse } from 'axios';

type NumberProperties = "even" | "odd" | "armstrong";

@Injectable()
export class NumberService {
  constructor(private readonly httpService: HttpService) {}

  async classifyNumber(number: number) {
    const isPrime = this.isPrime(number);
    const isPerfect = this.isPerfect(number);
    const isArmstrong = this.isArmstrong(number);
    const digitSum = this.calculateDigitSum(number);
    const isEven = number % 2 === 0;

    const properties: NumberProperties[] = [];
    if (isArmstrong) properties.push('armstrong');
    properties.push(isEven ? 'even' : 'odd');

    const funFact = await this.getFunFact(number);

    return {
      number,
      is_prime: isPrime,
      is_perfect: isPerfect,
      properties,
      digit_sum: digitSum,
      fun_fact: funFact,
    };
  }

  private isPrime(num: number): boolean {
    if (num < 2) return false;
    for (let i = 2; i <= Math.sqrt(num); i++) {
      if (num % i === 0) return false;
    }
    return true;
  }

  private isPerfect(num: number): boolean {
    if (num <= 0) return false; // Negative numbers & 0 are not perfect

    let sum = 0;
    for (let i = 1; i <= num / 2; i++) {
      if (num % i === 0) {
        sum += i;
      }
    }
    return sum === num;
  }

  private isArmstrong(num: number): boolean {
    const absNum = Math.abs(num); // Handle negatives
    const digits = absNum.toString().split('').map(Number);
    const numDigits = digits.length;
    const sum = digits.reduce((total, digit) => total + Math.pow(digit, numDigits), 0);

    return sum === absNum;
  }

  private calculateDigitSum(num: number): number {
    return Math.abs(num) // Handle negative numbers
      .toString()
      .split('')
      .map(Number)
      .reduce((sum, digit) => sum + digit, 0);
  }

  private async getFunFact(num: number): Promise<string> {
    try {
      const { data }: AxiosResponse<string> = await this.httpService.axiosRef.get(
        `http://numbersapi.com/${num}/math`
      );
      return data;
    } catch (error) {
      return `No fun fact found for ${num}. Error: ${error}`;
    }
  }
}
