import "reflect-metadata";
import { Field, InputType, Int, ObjectType } from "@nestjs/graphql";
import { User } from "@models/user.model";

@InputType()
export class CreatePostInput{
  @Field({nullable: false})
  content: string;
}

@ObjectType()
export class Post {
  @Field((_) => Int)
  id: number;

  @Field((_) => User)
  owner: User;

  @Field((_) => String)
  content: string;
}
