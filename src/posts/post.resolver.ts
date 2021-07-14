import { Args, Mutation, Query, Resolver } from "@nestjs/graphql";
import { PostService } from "./post.service";
import { CreatePostInput, Post } from "@models/post.model";
import { UseGuards } from "@nestjs/common";
import { GqlAuthGuard } from "@guards/gql-auth.guard";
import { CurrentUser } from "@decorators/user.dec";
import { User } from "@models/user.model";

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
      this.postService.create(user.id, data.content) 
    }
    return true;
  }

  @Query((_) => Post)
  async post(@Args("id") id: string) {
    return this.postService.findOneById(id);
  }

  @Query(_ => [Post])
  @UseGuards(GqlAuthGuard)
  async userPosts(@CurrentUser() user: User) {
    if (user.id) {
      return this.postService.findByUserId(user.id)
    } 
    return false
  }
}
