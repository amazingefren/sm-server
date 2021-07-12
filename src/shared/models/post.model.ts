import 'reflect-metadata'
import { Field, Int, ObjectType } from '@nestjs/graphql'
import { User } from '@models/user.model'

@ObjectType()
export class Post {
  @Field(_=>Int)
  id: number;

  @Field(_=>User)
  owner: User;

  @Field(_=>String)
  content: string
}
