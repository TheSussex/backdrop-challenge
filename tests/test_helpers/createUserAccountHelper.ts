import { DeepPartial, getRepository } from 'typeorm';
import UserEntity from '../../src/entities/userEntity';

export const createAccountEntity = (properties?: DeepPartial<UserEntity>) => {
  const repository = getRepository(UserEntity);
  return repository.create({
    ...properties,
  });
}

export const verifyUserBankAccountInfo = (properties?: DeepPartial<UserEntity>) => {
  const repository = getRepository(UserEntity);
  return repository.save(createAccountEntity(properties))
}
