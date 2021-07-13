import {
  AuthRegisterInput,
  AuthSafeUserLogin,
  AuthUser,
} from "@models/auth.model";
import { Query, Args, Resolver, Mutation } from "@nestjs/graphql";
import { AuthService } from "./auth.service";
import { AuthLoginInput } from "@models/auth.model";
import { Res } from "@nestjs/common";
import { FastifyReply, FastifyRequest } from "fastify";

interface AuthContextType {
  request: FastifyRequest;
  response: FastifyReply;
}

@Resolver(AuthUser)
export class AuthResolver {
  constructor(private authService: AuthService) {}

  @Query((_) => AuthSafeUserLogin)
  async login(
    @Res({ passthrough: true }) { response }: AuthContextType,
    @Args("data") data: AuthLoginInput
  ) {
    const user = await this.authService.login(data);
    if (user) {
      response.setCookie("Authorization", user.access_token);
      return user;
    } else {
      return user;
    }
  }

  @Mutation((_) => AuthSafeUserLogin)
  async register(
    @Res({ passthrough: true }) { response }: AuthContextType,
    @Args("data") data: AuthRegisterInput
  ) {
    const success = await this.authService.register(data);
    const { username, password } = data;
    if (success) {
      const user = await this.authService.login({ username, password });
      if (user) {
        response.setCookie("Authorization", user.access_token);
        return user;
      } else {
        console.log("Login failed during register");
      }
    } else {
      // Need GraphQL error handling
      // NOTE_TO_SELF: Logging after Error Handling
      return { username: "failed to register user" };
    }
  }
}
