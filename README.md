# backdrop-challenge


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
To start the application in development mode:

Create a `.env` file in the root folder. You can find reference in the `.env.example` file.
If you want to add some new variables, you also need to add them to interface and config object.

Then run:

```bash
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

- What's a good reason why the pure Levenshtein Distance algorithm might be a more effective solution than the broader Damerau–Levenshtein Distance algorithm in this specific scenario.

Unlike the pure Levenshtein Distance algorithm(pLD), the Damerau–Levenshtein Distance algorithm (D-LD) considers the transposition of adjacent characters as a valid edit operation. Transposition in this case means that “Jane Doe” is considered the same as “Doe Jane”.

Because bank account names are very sensitive and strict, using pLD might be more effective because it helps validate the user input in the exact order it was entered. 

This provides a more accurate measurement of string similarity for inputs without transposed characters and removes the added complexity of transpositions making it faster to process strings.
