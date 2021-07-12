import { Injectable } from '@nestjs/common'
// import { Post } from '@global/gen/graphql.schema'

@Injectable()
export class PostService {
  private readonly post: {} = {
    id: "0", 
    owner: "0",
    content: "Post Test"
  }

  create(post: {}): {} {
    return post
  }

  findOneById(id: string): {} {
    if (id == this.post) {
      return this.post
    }
    return Object.assign(this.post, {content: "Not Found"})
  }
}
