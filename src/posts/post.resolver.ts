import { Args, Query, Resolver } from "@nestjs/graphql";
import { PostService } from './post.service'
import { Post } from './post.model'

@Resolver('Post')
export class PostResolver {
  constructor(
    private postService: PostService
  ) {}

  @Query(_=>Post)
  async post(@Args('id') id:string) {
    return this.postService.findOneById(id);
  }
}
