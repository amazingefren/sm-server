import { Injectable } from '@nestjs/common'
import { Post } from '@global/gen/graphql.schema'

@Injectable()
export class PostService {
  private readonly post: Post = {
    id: "0", 
    owner: "0",
    content: "Post Test"
  }

  create(post: Post): Post {
    console.log(post);
    return post
  }

  findOneById(id: string): Post {
    console.log("HI")
    if (id == this.post.id) {
      return this.post
    }
    return Object.assign(this.post, {content: "Not Found"})
  }
}
