
```markdown
# Number Classifier API

This project provides a number classification API built with **NestJS**. It allows users to classify a number based on certain mathematical properties like whether it is **perfect**, **Armstrong**, or **even/odd**. The API also includes a fun fact about the number fetched from an external API.

## Table of Contents

- [Technologies Used](#technologies-used)
- [API Endpoints](#api-endpoints)
  - [Classify Number](#classify-number)
- [Number Classifications](#number-classifications)
  - [Perfect Number](#perfect-number)
  - [Armstrong Number](#armstrong-number)
  - [Digit Sum](#digit-sum)
- [Installation](#installation)
- [Usage](#usage)
- [Development](#development)
- [Contributing](#contributing)

## Technologies Used

- **NestJS** - A progressive Node.js framework for building efficient and scalable server-side applications.
- **TypeScript** - A typed superset of JavaScript that compiles to plain JavaScript.
- **Axios** - A promise-based HTTP client for the browser and Node.js used to fetch fun facts.
- **class-validator** - A library to validate class properties in NestJS DTOs (Data Transfer Objects).
- **ESLint** - A static code analysis tool for identifying and reporting on patterns found in ECMAScript/JavaScript code.

## API Endpoints

### Classify Number

- **Endpoint:** `GET /api/classify-number`
- **Query Parameter:** `number` (integer to classify)
- **Response:** JSON containing classification results and fun fact.

#### Example Request:
```bash
GET http://localhost:3000/api/classify-number?number=40
```

#### Example Response:
```json
{
  "number": 40,
  "is_prime": false,
  "is_perfect": false,
  "properties": ["even", "odd"],
  "digit_sum": 4,
  "fun_fact": "No fun fact found for 40."
}
```

## Number Classifications

### Perfect Number
A perfect number is a positive integer that is equal to the sum of its proper divisors (excluding the number itself). For example, 6 is a perfect number because:
```
1 + 2 + 3 = 6
```

### Armstrong Number
An Armstrong number (or Narcissistic number) is a number that is equal to the sum of its digits, each raised to the power of the number of digits. For example, 153 is an Armstrong number because:
```
1^3 + 5^3 + 3^3 = 153
```

### Digit Sum
The digit sum is the sum of all the digits in a number. For example:
```
123 -> 1 + 2 + 3 = 6
```

## Installation

1. Clone the repository:
```bash
git clone https://github.com/thamesblanq/HNG-Backend-1
```

2. Install dependencies:
```bash
npm install
```

## Usage

### Running the Application
To start the NestJS server in development mode, run the following command:
```bash
npm run start:dev
```
The server will run on `http://localhost:3000`.

### Testing the API
You can test the `classify-number` endpoint by making a GET request with a `number` query parameter:
```bash
GET http://localhost:3000/api/classify-number?number=40
```

## Development

### Start the Server
To start the server in development mode with hot-reloading, run:
```bash
npm run start:dev
```

### Linting
To check your code for style violations or possible errors, run:
```bash
npm run lint
```

### Running Tests
To run the tests, use the following command:
```bash
npm run test
```

### Testing with Postman or Curl
You can test the API using tools like Postman or `curl`. Here's an example `curl` request:
```bash
curl "http://localhost:3000/api/classify-number?number=40"
```

## Contributing

Contributions are welcome! Feel free to fork the repository and submit pull requests for improvements.

### To Do:
- Add more number classifications (e.g., Prime numbers, Fibonacci numbers).
- Improve error handling and validation.
- Integrate more external APIs for fun facts.

---

Made with ❤️ by [blanq and AI]
```