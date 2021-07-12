import { Injectable } from "@nestjs/common";
import { PrismaService } from "@services/prisma.service";
import { Prisma } from "@prisma/client";
import { User, UserUniqueInput, UserCreateInput } from '@models/user.model'

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  private readonly user: User = {
    id: 0,
    username: "bob",
    joinDate: new Date(Date.now()),
    posts: [],
  };

  // TODO CHANGE NULL TO SUPPORT ERROR TYPES FOR FRONT END
  async create(user: UserCreateInput): Promise<User | null> {
    return await this.prisma.user.create({data:{username:user.username, password: user.password}})
  }


  async findOneById(id: UserUniqueInput): Promise<User | null> {

    let input: Prisma.UserWhereUniqueInput = id

    return id.id == 0 ? this.user: await this.prisma.user.findUnique({where:input})
  }

  async findOneByUsername(username: string): Promise<User | null> {
    return await this.prisma.user.findUnique({where:{username}})
  }

  async findAll(): Promise<User[] | null> {
    return this.prisma.user.findMany()
  }
}
