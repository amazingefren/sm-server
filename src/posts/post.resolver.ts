import { Args, Info, Mutation, Query, Resolver } from "@nestjs/graphql";
import { PostService } from "./post.service";
import { CreatePostInput, Post } from "@models/post.model";
import { UseGuards } from "@nestjs/common";
import { GqlAuthGuard } from "@guards/gql-auth.guard";
import { CurrentUser } from "@decorators/user.dec";
import { User } from "@models/user.model";
import { GraphQLResolveInfo } from "graphql";
import { JwtDTO } from "@dto/jwt.dto";
import graphqlFields from "graphql-fields";

@Resolver("Post")
export class PostResolver {
  constructor(private postService: PostService) {}

  @Mutation((_) => Boolean)
  @UseGuards(GqlAuthGuard)
  async createPost(
    @Args("data") data: CreatePostInput,
    @CurrentUser() user: User
  ) {
    if (user.id) {
      this.postService.create(user.id, data.content);
    }
    return true;
  }

  @Query(_=>Post)
  async post(@Args("id") id: number) {
    console.log(id)
    return await this.postService.findOneById(id);
  }

  @Query(_ => [Post])
  @UseGuards(GqlAuthGuard)
  async myPosts(@CurrentUser() user: JwtDTO, @Info() info: GraphQLResolveInfo) {
    /* console.log(test.fieldNodes[0].selectionSet?.selections?.forEach((obj:any)=>{
      console.log(obj.name.value)
    })) */
    // Worth the performance? not sure
    const getUser: boolean = graphqlFields(info)["owner"] ? true : false;
    return await this.postService.findByUserId(user.sub, getUser);
  }
}
