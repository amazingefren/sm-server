import { UserModule } from "@global/users/user.module";
import { Module } from "@nestjs/common";
import { PassportModule } from "@nestjs/passport";
import { AuthService } from "./auth.service";
import { JwtModule } from "@nestjs/jwt";
import { JwtStrategy } from "./jwt.strategy";
import { jwtConstants } from "./constants";
import { AuthResolver } from "./auth.resolver";

@Module({
  imports: [
    UserModule,
    PassportModule,
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '5m' },
    }),
  ],
  providers: [AuthResolver, AuthService, JwtStrategy],
  exports: [AuthService, JwtModule]
})
export class AuthModule {}
