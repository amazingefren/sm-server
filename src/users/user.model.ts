import 'reflect-metadata'
import { Field, Int, ObjectType, InputType } from '@nestjs/graphql'
import { Post } from "@global/posts/post.model"

@InputType()
export class UserCreateInput {
  @Field({nullable:false})
  username: string
}

@InputType()
export class UserUniqueInput {
  @Field({nullable: false})
  id: number
}

@ObjectType()
export class User {
  @Field(_=> Int)
  id: number;

  @Field(_=>String, {nullable: true})
  username: string;

  @Field(_=>[Post], {nullable: true})
  posts?: Post[]

  @Field(_=>Date)
  joinDate: Date
}
