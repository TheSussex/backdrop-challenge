# backdrop-challenge

# 

## Description
Backend component of a bank account validation app. Node.js Express API with TypeScript, GraphQL & TypeORM.


## Features
##### Bank Account Verification:
- verifies bank account using the Paystack's account resolution API
##### Session Storage:
- PostgreSQL
##### Integration testing
- jest

## Requirements

- node >= 14
- npm >= 6
- typescript >= 4.0

## Running the API
### Development
To start the application in development mode, run:

```bash
npm install -g nodemon
npm install -g ts-node
npm install -g typescript
npm install
```

Start the application in dev env:
```
npm run watch
```


### Testing
To run integration tests: 
```bash
npm test
```

## Set up environment
In root folder you can find `.env`. You can use this config or change it for your purposes.
If you want to add some new variables, you also need to add them to interface and config object (Look `src/config/index.ts`)

## Usage as OAuth2.0 Server
To use this generator as OAuth2.0 server you should implement client side, that will be handle your redirectUris and make requests to `/auth/token/` route. [Read more about OAuth2.0](https://alexbilbie.com/guide-to-oauth-2-grants/)

## Swagger
```bash
npm install -g swagger-jsdoc
swagger-jsdoc -d swaggerDef.js -o swagger.json
```
Swagger documentation will be available on route: 
```bash
http://localhost:3000/docs
```
![Alt Text](https://i.ibb.co/b6SdyQV/gif1.gif)

## Getting To Know Yeoman

 * Yeoman has a heart of gold.
 * Yeoman is a person with feelings and opinions, but is very easy to work with.
 * Yeoman can be too opinionated at times but is easily convinced not to be.
 * Feel free to [learn more about Yeoman](http://yeoman.io/).

[travis-image]: https://travis-ci.org/caiobsouza/generator-ts-node-api.svg?branch=master
[travis-url]: https://travis-ci.org/caiobsouza/generator-ts-node-api

- What's a good reason why the pure Levenshtein Distance algorithm might be a more effective solution than the broader Damerau–Levenshtein Distance algorithm in this specific scenario.

Unlike the pure Levenshtein Distance algorithm(pLD), the Damerau–Levenshtein Distance algorithm (D-LD) considers the transposition of adjacent characters as a valid edit operation. Transposition in this case means that “Jane Doe” is considered the same as “Doe Jane”.

Because bank account names are very sensitive and strict, using pLD might be more effective because it helps validate the user input in the exact order it was entered. 

This provides a more accurate measurement of string similarity for inputs without transposed characters and removes the added complexity of transpositions making it faster to process strings .

If you make any major assumptions about any part of your solution, please state them in the readme
