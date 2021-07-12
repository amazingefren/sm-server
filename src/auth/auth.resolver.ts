import { User } from "@models/user.model";
import {
  Resolver,
  Query,
  Args,
} from "@nestjs/graphql";
import { AuthService } from "./auth.service";
import { AuthLoginInput, AuthLoginTokenResponse } from "@models/auth.model";
// import { GqlAuthGuard } from "./gql-auth.guard";
// import { UseGuards } from "@nestjs/common";

@Resolver(User)
export class AuthResolver {
  constructor(private authService: AuthService) {}

  @Query((_) => AuthLoginTokenResponse)
  // @UseGuards(GqlAuthGuard)
  async login(
    @Args("data") data: AuthLoginInput,
  ) {
    return this.authService.login(data);
  }
}
