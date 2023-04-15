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

- node >= 16
- npm >= 6
- typescript >= 4.0

## Running the API
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

Here is a [link to the Postman Documentation](https://documenter.getpostman.com/view/23687723/2s93Xx1jos).

### Testing
To run integration tests: 
```bash
npm run test
```

### What's a good reason why the pure Levenshtein Distance algorithm might be a more effective solution than the broader Damerau–Levenshtein Distance algorithm in this specific scenario.

Unlike the pure Levenshtein Distance algorithm (pLD), the Damerau–Levenshtein Distance algorithm (D-LD) considers transposition of adjacent characters a valid edit operation, meaning "Jane Doe" is equivalent to "Doe Jane." 

When dealing with sensitive and strict data like bank account names, using pLD may be more effective as it validates the user input in the exact order it was entered. 

This approach provides a more accurate measurement of string similarity for inputs without transposed characters and eliminates the added complexity of transpositions, making string processing faster.


### If you make any major assumptions about any part of your solution, please state them in the readme
In my soultion, I assumed that the order in which the user_accoutn_name is written matters greatly. If an account is registered with "Ologunsua Success" in the bank, it needs to be be validated same way and same order and not with "Success Ologunsua".

The reason for this assumption is based on my knowlegde of how strict banks take issues of account naming, it's so serious that people are required to swear an affidavit to to make a few letter changes and it will be nice to uphold that level of scrutiny. We're are dealing with people's money so impersonation needs to be greatly discouraged.
