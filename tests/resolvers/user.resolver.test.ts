import createApolloServer from "../test_helpers/createApolloServer";

describe("Test validate bank account details", () => {
    const QUERY = `
        mutation verifyUserBankAccountInfo($userBankCode: String!, $userAccountNumber: String!, $userAccountName: String!) {
        verifyUserBankAccountInfo(user_bank_code: $userBankCode, user_account_number: $userAccountNumber, user_account_name: $userAccountName) {
            id,
            user_account_name,
            user_account_number,
            user_bank_code,
            is_verified,
            created_at
        }
    }`;

  test("Should throw error is required field missing(user_account_name)", async () => {
    const server = createApolloServer();
    const response = await server.executeOperation({
      query: QUERY,
      variables: {
        userAccountNumber: "2387324395",
        userBankCode: "00",
      },
    });
    expect(response).toGraphQLResponseError(
      new Error(
        'Variable "$userAccountName" of required type "String!" was not provided.'
      )
    );
  });

  test("Should throw error if invalid bank code sent", async () => {
    const server = createApolloServer();
    const response = await server.executeOperation({
      query: QUERY,
      variables: {
        userAccountNumber: "2387324395",
        userBankCode: "00",
        userAccountName: "qwer",
      },
    });
    expect(response).toGraphQLResponseError(
      new Error("Invalid bank code")
    );
  });

  test("Should throw error if user inputted name does not match api provided name", async () => {
    const server = createApolloServer();
    const response = await server.executeOperation({
      query: QUERY,
      variables: {
        userAccountNumber: "2070823040",
        userBankCode: "033",
        userAccountName: "mr lagbaja",
      },
    });
    expect(response).toGraphQLResponseError(new Error("Names doesn't match"));
  });

  test("Should validate user account details and update in the DB", async () => {
    const server = createApolloServer();
    const response = await server.executeOperation({
      query: QUERY,
      variables: {
        user_account_name: "Success Ologunsua",
        user_account_number: "2070823040",
        user_bank_code: "033"
      },
    });

    expect(response.data).toGraphQLResponseData({
      verifyUserBankAccountInfo: [
        {
          id: 1,
        },
      ],
    });
  });

  test("Should throw if account number already exists", async () => {
    const server = createApolloServer();
    const response = await server.executeOperation({
      query: QUERY,
      variables: {
        user_account_name: "Success Ologunsua",
        user_account_number: "2070823040",
        user_bank_code: "033"
      },
    });
    expect(response).toGraphQLResponseError(new Error("Account already exists"));
  });
});

describe("Test get bank account name", () => {
  const QUERY = `
    query GetUserAccountName($accountNumber: String!, $bankCode: String!) {
        getUserAccountName(account_number: $accountNumber, bank_code: $bankCode) 
    }`;

    test("Should throw error if invalid bank code sent", async () => {
        const server = createApolloServer();
        const response = await server.executeOperation({
          query: QUERY,
          variables: {
            accountNumber: "2070823041",
            bankCode: "000",
          },
        });
        expect(response).toGraphQLResponseError(
          new Error("Invalid bank code")
        );
      });

    test("Should successfully fetch saved user details in the DB", async () => {
    const server = createApolloServer();
    const response = await server.executeOperation({
      query: QUERY,
      variables: {
        accountNumber: "2070823040",
        bankCode: "033",
      },
    });

    expect(response.data).toGraphQLResponseData({
        getUserAccountName: [
        {
          id: 1,
          user_account_name: 'Success Ologunsua'
        },
      ],
    });
  });
});
