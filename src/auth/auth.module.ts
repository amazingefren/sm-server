import { UserModule } from "@users/user.module";
import { Module } from "@nestjs/common";
import { PassportModule } from "@nestjs/passport";
import { AuthService } from "./auth.service";
import { JwtModule } from "@nestjs/jwt";
import { JwtStrategy } from "./strategy/jwt.strategy";
import { AuthResolver } from "./auth.resolver";
import { CookieInterceptor } from "./interceptor/cookie.service";
import { PrismaService } from '@services/prisma.service'

@Module({
  imports: [
    UserModule,
    PassportModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: "5m" },
    }),
  ],
  providers: [PrismaService, AuthResolver, AuthService, JwtStrategy, CookieInterceptor],
  exports: [AuthService, JwtModule],
})
export class AuthModule {}
