import { Args, Mutation, Query, Resolver } from "@nestjs/graphql";
import { UserService } from "./user.service";
import { User, UserUniqueInput, UserCreateInput } from "@models/user.model";
import { GqlAuthGuard } from "@guards/gql-auth.guard";
import { UseGuards } from "@nestjs/common";
import { CurrentUser } from "@decorators/user.dec";
// import { AuthService } from '@global/auth/auth.service'

@Resolver(User)
export class UserResolver {
  constructor(
    // @Inject(PrismaService)
    private userService: UserService,
    // private authService: AuthService
  ) {}

  @Mutation(_=>User)
  async createUser(
    @Args('data') data: UserCreateInput,
    // @Args('password') password: string
  ) {
    // let input: UserCreateInput = {username}
    return this.userService.create(data)
  }

  @Query(_=>User, { nullable: true })
  async user(@Args("id") id: number) {
    let input: UserUniqueInput = {id}
    return this.userService.findOneById(input);
  }

  @Query(_=>[User], {nullable:true})
  @UseGuards(GqlAuthGuard)
  async listAllUsers(){
    return this.userService.findAll();
  }

  @Query(_=>User)
  @UseGuards(GqlAuthGuard)
  whoAmI(@CurrentUser() user: User) {
    if (user.id) {
      return this.userService.findOneById({id: user.id})
    }
    // return {}
  }
}
