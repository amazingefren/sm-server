import { Injectable } from "@nestjs/common";
import { PrismaService } from "@services/prisma.service";
// import { Post } from '@global/gen/graphql.schema'

@Injectable()
export class PostService {
  constructor(private prisma: PrismaService){}
  private readonly post: {} = {
    id: "0",
    owner: "0",
    content: "Post Test",
  };

  async create(id: number, content: string): Promise<any> {
    console.log("Creating New Post: ", {id, content})
    const data = {ownerId: id, content}
    console.log(await this.prisma.post.create({data}))
  }

  findOneById(id: string): {} {
    if (id == this.post) {
      return this.post;
    }
    return Object.assign(this.post, { content: "Not Found" });
  }

  // NO N+1 ISSUE
  async findByUserId(id: number){
    // Want to see if I can create conditional based on query, for which
    // Conditional {include: *} 
    // will be included to prevent +1 query call from prisma
    const data = await this.prisma.post.findMany({where: {ownerId: id}, include: {owner: true}})
    return data
  }
}
