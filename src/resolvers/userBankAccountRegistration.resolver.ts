import { Arg, Query, Mutation, Resolver } from "type-graphql";
import { Service } from "typedi";
import { getRepository } from "typeorm";

import logger from "../config/logger";
import UserEntity from "../entities/userEntity";
import { calculateLevenshteinDistance, resolveAccountNumber, capitalize } from "../utils/helpers";

/**
 * Class thats handles User entity queries
 */
@Resolver()
@Service()
export default class BankAccountRegistrationResolver {
  /**
   *   mutation resolver to validate user inputted bank account details
   *   @returns {UserEntity} response
   */
  @Mutation(() => [UserEntity], {
    description: "validate user inputted bank account details",
  })
  async verifyUserBankAccountInfo(
    @Arg("user_account_name", { nullable: false }) user_account_name: string,
    @Arg("user_account_number", { nullable: false }) user_account_number: string,
    @Arg("user_bank_code", { nullable: false }) user_bank_code: string
  ): Promise<[UserEntity] | Error> {
    try {
      const userRepository = getRepository(UserEntity);

      logger.info(`Checking if account number already exists in userBankAccountRegistration.resolver.ts`);
      const user = await userRepository.findOne({
        where: [{ user_account_number }],
      });

      if (user) {
        logger.info(`Confirms that user with account number: ${user_account_number} already exists in the DB userBankAccountRegistration.resolver.ts`);
        return new Error("Account already exists");
      }

      logger.info(`Confirms that user with account number: ${user_account_number} does not exists in the DB userBankAccountRegistration.resolver.ts`);
      logger.info(`Resolving user details with paystack API in userBankAccountRegistration.resolver.ts`);
      const paystackResponse: any = await resolveAccountNumber({ user_account_number, user_bank_code });

      if (paystackResponse.response && paystackResponse.response.data.message) {
        logger.info(`Error returned by paystack API in userBankAccountRegistration.resolver.ts`);
        return new Error(paystackResponse.response.data.message);
      }

      logger.info(`Paystack API returned information about account number provided in userBankAccountRegistration.resolver.ts`);
      const apiProvidedName = capitalize(paystackResponse.data.data.account_name);
      const userInputtedName = capitalize(user_account_name);

      if (apiProvidedName === userInputtedName) {
        logger.info(`API returned data matches user inputted data about account number provided in userBankAccountRegistration.resolver.ts`);
        const user = new UserEntity();
        user.user_account_number = user_account_number;
        user.user_bank_code = user_bank_code;
        user.user_account_name = userInputtedName;
        user.is_verified = true;
        await userRepository.save(user);
        logger.info(`User data saved in the database in userBankAccountRegistration.resolver.ts`);
        return [user];
      }

      // if name doesn't match paystack's, calculate ld
      const levenshteinDistance = await calculateLevenshteinDistance(apiProvidedName, userInputtedName);

      if (levenshteinDistance <= 2) {
        const user = new UserEntity();
        user.user_account_number = user_account_number;
        user.user_bank_code = user_bank_code;
        user.user_account_name = userInputtedName;
        user.is_verified = true;
        await userRepository.save(user);
        logger.info(`New account details saved in the db userBankAccountRegistration.resolver.ts`);
        return [user];
      } else {
        logger.info(`User account name does not match the account name returned by the API in userBankAccountRegistration.resolver.ts`);
        return new Error("Names doesn't match");
      }

    } catch (error) {
      logger.info(`An error occurred while validating user inputted bank account details in userBankAccountRegistration.resolver.ts`, error);
      return new Error("Something went wrong, we are looking into it");
    }
  }

  /**
   *   Query resolver to get user account name
   *   @returns {UserEntity} response
   */
  @Query(() => String, { description: "Get user account name" })
  async getUserAccountName(
    @Arg("bank_code", { nullable: false }) bank_code: string,
    @Arg("account_number", { nullable: false }) account_number: string
  ): Promise<String | Error> {
    try {
      logger.info(`Attempting to get user account name with bank_code: ${bank_code} and account_number: ${account_number} in userBankAccountRegistration.resolver.ts`);

      const userRepository = getRepository(UserEntity);

      const user = await userRepository.findOne({
        where: {
          user_bank_code: bank_code,
          user_account_number: account_number
        }
      });

      if (!user) {
        // if not user, returns the name that Paystack would otherwise have provided

        logger.info(`Confims that user with bank_code: ${bank_code} and account_number: ${account_number} does not exist in the DB in userBankAccountRegistration.resolver.ts`);
        logger.info(`Resolving user details with paystack API in userBankAccountRegistration.resolver.ts`);
        const paystackResponse: any = await resolveAccountNumber({ user_account_number: account_number, user_bank_code: bank_code });

        if (paystackResponse.response && paystackResponse.response.data.message) {
          logger.info(`Error returned by paystack API in userBankAccountRegistration.resolver.ts`);
          return new Error(paystackResponse.response.data.message);
        }

        logger.info(`Confirms that paystack API returned information about account number and bank code in userBankAccountRegistration.resolver.ts`);
        const apiProvidedName = capitalize(paystackResponse.data.data.account_name);
        return apiProvidedName;
      }

      logger.info(`Confims that user with bank_code: ${bank_code} and account_number: ${account_number} exists in the DB in userBankAccountRegistration.resolver.ts`);
      return user.user_account_name;
    } catch (error) {
      logger.info(`An error occurred while fetching user account name for account_number: ${account_number} in Method::getUserAccountName of userBankAccountRegistration.resolver.ts`, error);
      return new Error("Something went wrong, we're looking into it");
    }
  }
}
