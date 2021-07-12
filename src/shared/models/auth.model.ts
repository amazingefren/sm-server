import 'reflect-metadata'
import { Field, InputType, ObjectType } from '@nestjs/graphql'

@ObjectType()
export class AuthLoginTokenResponse {
  @Field()
  access_token: string
}


@InputType()
export class AuthLoginInput{
  @Field({nullable: false})
  username: string

  @Field({nullable: false})
  password: string
}
