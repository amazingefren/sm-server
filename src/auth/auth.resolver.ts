import { User } from "@models/user.model";
import { Query, Args, Resolver } from "@nestjs/graphql";
import { AuthService } from "./auth.service";
import { AuthLoginInput, AuthLoginTokenResponse } from "@models/auth.model";
import { UseInterceptors } from "@nestjs/common";
import { CookieInterceptor } from "./interceptor/cookie.service";
// import { Res } from "@nestjs/common";
// import { FastifyReply } from "fastify";

@Resolver(User)
export class AuthResolver {
  constructor(private authService: AuthService) {}

  @Query((_) => AuthLoginTokenResponse)
  // async login(@Context() context: any, @Args("data") data: AuthLoginInput) {
  @UseInterceptors(CookieInterceptor)
  async login(@Args("data") data: AuthLoginInput) {
    // Intercepting Response, will assign cookie
    return this.authService.login(data);
  }
}
