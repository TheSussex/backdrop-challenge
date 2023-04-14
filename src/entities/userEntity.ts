import {
    Column,
    Entity,
    PrimaryGeneratedColumn,
    CreateDateColumn,
    UpdateDateColumn
  } from 'typeorm';
  import { Field, ObjectType } from 'type-graphql';
  
  @ObjectType('User')
  @Entity()
  export default class UserEntity {
    @Field()
    @PrimaryGeneratedColumn()
    id: number;
  
    @Field()
    @Column('varchar', { nullable: false })
    user_account_number: string;
  
    @Field()
    @Column('varchar', { nullable: false })
    user_bank_code: string;

    @Field()
    @Column('varchar', { nullable: false })
    user_account_name: string;

    @Field()
    @Column('boolean', { nullable: false, default: false })
    is_verified: boolean;
  
    @Field()
    @CreateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)" })
    created_at: Date;
  
    @Field()
    @UpdateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)", onUpdate: "CURRENT_TIMESTAMP(6)" })
    updated_at: Date;
  }
  