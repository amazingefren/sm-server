import { Post } from "@models/post.model";
import { User } from "@models/user.model";
import { Injectable } from "@nestjs/common";
import { PrismaService } from "@services/prisma.service";
// import { Post } from '@global/gen/graphql.schema'

@Injectable()
export class PostService {
  constructor(private prisma: PrismaService){}

  async create(id: number, content: string): Promise<any> {
    console.log("Creating New Post: ", {id, content})
    const data = {ownerId: id, content}
    console.log(await this.prisma.post.create({data}))
  }

  // Return type I need error handling
  async findOneById(id: number): Promise<Post & {owner: User | null}| null> {
    return await this.prisma.post.findUnique({where: {id}, include: {owner: true}})
  }

  // NO N+1 ISSUE
  // Return type I need error handling
  async findByUserId(id: number, getUser: boolean): Promise<(Post & {owner: User | null})[] | null>{
    return await this.prisma.post.findMany({where: {ownerId: id}, include: {owner: getUser}})
  }
}
