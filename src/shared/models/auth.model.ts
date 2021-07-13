import "reflect-metadata";
import { Field, InputType, ObjectType } from "@nestjs/graphql";
import { User } from "./user.model";

@ObjectType()
export class AuthLoginTokenResponse {
  @Field()
  access_token: string;
}

@InputType()
export class AuthLoginInput {
  @Field({ nullable: false })
  username: string;

  @Field({ nullable: false })
  password: string;
}

@ObjectType()
export class AuthUser extends User {
  @Field({ nullable: false })
  password: string;
}

@ObjectType()
export class AuthSafeUserLogin extends User {
  @Field({ nullable: false })
  access_token: string;
}

@InputType()
export class AuthRegisterInput extends AuthLoginInput {}
