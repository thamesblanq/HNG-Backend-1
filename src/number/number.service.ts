import { Injectable, Inject } from '@nestjs/common';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { HttpService } from '@nestjs/axios';
import { AxiosResponse } from 'axios';
import { Cache } from 'cache-manager';

type NumberProperties = "even" | "odd" | "armstrong";

@Injectable()
export class NumberService {
  private primeCache = new Map<number, boolean>();
  private perfectCache = new Map<number, boolean>();

  constructor(
    private readonly httpService: HttpService,
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
  ) {}

  async classifyNumber(number: number | string) {
    // Input validation
    if (typeof number !== 'number' || !Number.isInteger(number)) {
      return this.handleInvalidInput(number);
    }

    // Early exit for small numbers
/*     if (number < 2) {
      return this.handleSmallNumber(number);
    } */

    // Use memoization for performance-critical checks
    const isPrime = this.memoizedIsPrime(number);
    const isPerfect = this.memoizedIsPerfect(number);
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

  private handleInvalidInput(input: any) {
    if (typeof input === 'string' && isNaN(Number(input))) {
      return { number: "alphabet", error: true };
    }
  
    // Check if input is a number or can be converted to a number
    const parsedNumber = Number(input);
    if (!isNaN(parsedNumber)) {
      return { number: parsedNumber, error: true };
    }
  
    // If input is neither string nor number, handle accordingly
    return { number: "invalid", error: true };
  }

/*   private async handleSmallNumber(number: number) {
    return {
      number,
      is_prime: false,
      is_perfect: false,
      properties: ["odd"],
      digit_sum: Math.abs(number),
      fun_fact: await this.getFunFact(number),
    };
  } */

  private memoizedIsPrime(num: number): boolean {
    if (this.primeCache.has(num)) {
      return this.primeCache.get(num)!;
    }
    
    const result = this.isPrime(num);
    this.primeCache.set(num, result);
    
    return result;
  }

  private memoizedIsPerfect(num: number): boolean {
    if (this.perfectCache.has(num)) {
      return this.perfectCache.get(num)!;
    }
    
    const result = this.isPerfect(num);
    this.perfectCache.set(num, result);
    
    return result;
  }

  private isPrime(num: number): boolean {
    if (num < 2) return false;
    if (num === 2) return true;
    if (num % 2 === 0) return false;

    for (let i = 3; i <= Math.sqrt(num); i += 2) {
      if (num % i === 0) return false;
    }
    
    return true;
  }

  private isPerfect(num: number): boolean {
    let sum = 1; // Start with 1 since it's a divisor of every number
    for (let i = 2; i * i <= num; i++) {
      if (num % i === 0) {
        sum += i;
        if (i !== num / i) sum += num / i; // Add the complementary divisor
      }
    }
    
    return sum === num && num !== 1; // Exclude the case where num is 1
  }

  private isArmstrong(num: number): boolean {
    // Return false for all negative numbers
    if (num < 0) return false;
  
    // Ensure all single-digit numbers (0 to 9) are considered Armstrong
    if (num >= 0 && num <= 9) return true;
  
    // Work with the absolute value for calculations (though num is already non-negative)
    const absoluteNum = Math.abs(num);
    const digits = absoluteNum.toString().split("").map(Number);
    const numDigits = digits.length;
  
    // Compute the Armstrong sum
    const armstrongSum = digits.reduce((sum, digit) => sum + Math.pow(digit, numDigits), 0);
  
    // Compare with the absolute value of the original number
    return armstrongSum === absoluteNum;
  }
  
  
  
    

  private calculateDigitSum(num: number): number {
    return Math.abs(num)
      .toString()
      .split("")
      .reduce((sum, digit) => sum + parseInt(digit, 10), 0);
  }

  private async getFunFact(num: number): Promise<string> {
    const cacheKey = `fun-fact-${num}`;
    
    // Check cache first
    const cachedFact = await this.cacheManager.get<string>(cacheKey);
    
    if (cachedFact) {
      return cachedFact;
    }
  
    try {
      const { data }: AxiosResponse<string> = await this.httpService.axiosRef.get(`http://numbersapi.com/${num}/math`, {
        timeout: 400,
      });
      
      // Set cache with TTL as a number (in milliseconds)
      await this.cacheManager.set(cacheKey, data, 60 * 60); // Cache for one hour
      return data;
      
    } catch (error) {
      return `No fun fact found for ${num}. Error: ${error}`;
    }
  }
  
}
