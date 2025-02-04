import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { AxiosResponse } from 'axios';

type NumberProperties = "even" | "odd" | "armstrong";

@Injectable()
export class NumberService {
  constructor(private readonly httpService: HttpService) {}

  async classifyNumber(number: any) {
    // Check if the input is a number
    if (typeof number !== 'number') {
      return { error: "Input must be a number. Strings are not allowed." };
    }

    // Check if the number is an integer (reject floats)
    if (!Number.isInteger(number)) {
      return { error: "Only integers are allowed. Floats are not accepted." };
    }

    const isPrime = this.isPrime(number);
    const isPerfect = this.isPerfect(number);
    const isArmstrong = this.isArmstrong(number);
    const digitSum = this.calculateDigitSum(number);
    const isEven = number % 2 === 0;

    const properties: NumberProperties[] = [];
    if (isArmstrong) properties.push("armstrong");
    properties.push(isEven ? "even" : "odd");

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
    let sum = 1;
    for (let i = 2; i * i <= num; i++) {
      if (num % i === 0) {
        sum += i;
        if (i !== num / i) sum += num / i;
      }
    }
    return sum === num && num !== 1;
  }

  private isArmstrong(num: number): boolean {
    const digits = num.toString().split("").map(Number);
    const numDigits = digits.length;
    return digits.reduce((sum, digit) => sum + Math.pow(digit, numDigits), 0) === num;
  }

  private calculateDigitSum(num: number): number {
    const absSum = Math.abs(num)
      .toString()
      .split("")
      .reduce((sum, digit) => sum + parseInt(digit, 10), 0);
    return num < 0 ? -absSum : absSum;
  }

  private async getFunFact(num: number): Promise<string> {
    try {
      const { data }: AxiosResponse<string> = await this.httpService.axiosRef.get(`http://numbersapi.com/${num}/math`);
      return data;
    } catch (error) {
      return `No fun fact found for ${num}. Error: ${error}`;
    }
  }
}