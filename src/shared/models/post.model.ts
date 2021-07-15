import "reflect-metadata";
import { Field, InputType, Int, ObjectType } from "@nestjs/graphql";
import { User } from "@models/user.model";

@InputType()
export class CreatePostInput{
  @Field({nullable: false})
  content: string;
}

@InputType()
export class FindPostInput{
  @Field(_=>Int, {nullable: false})
  id: number;
}

@ObjectType()
export class Post {
  @Field((_) => Int)
  id: number;

  @Field(_ => User, {nullable: true})
  owner: User | null;

  @Field((_) => String)
  content: string;
}
