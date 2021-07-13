import "reflect-metadata";
import { Field, Int, ObjectType, InputType } from "@nestjs/graphql";
import { Post } from "@models/post.model";

@InputType()
export class UserCreateInput {
  @Field({ nullable: false })
  username: string;
  @Field({ nullable: false })
  password: string;
}

@InputType()
export class UserUniqueInput {
  @Field({ nullable: false })
  id: number;
}

@ObjectType()
export class User {
  @Field((_) => Int, { nullable: true })
  id?: number;

  @Field((_) => String, { nullable: true })
  username?: string;

  @Field((_) => [Post], { nullable: true })
  posts?: Post[];

  @Field((_) => Date, { nullable: true })
  joinDate?: Date;

  // @Field(_=>String, {nullable: true})
  // password?: string;
}
