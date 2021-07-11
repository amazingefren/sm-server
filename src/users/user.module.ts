import { Module } from "@nestjs/common";
import { PrismaService } from "@global/prisma.service";
import { UserResolver } from "./user.resolver";
import { UserService } from "./user.service";


@Module({
  providers: [PrismaService, UserService, UserResolver],
  exports: [UserService]
})

export class UserModule {}
