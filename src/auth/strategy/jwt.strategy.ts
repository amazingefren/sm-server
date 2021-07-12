import { JwtDTO } from "@dto/jwt.dto";
import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
// import { jwtConstants } from "auth/constants";
import { ExtractJwt, Strategy } from "passport-jwt";
import { AuthService } from "../auth.service";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy){
  constructor(private authService: AuthService){
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: true,
      secretOrKey: process.env.JWT_SECRET
    })
  }
  async validate(input: JwtDTO): Promise<any>{
    console.log("JWT: Extracted")
    const user = await this.authService.validateUser(input.sub);
    if (!user){
      console.log("JWT: Invalid User")
      throw new UnauthorizedException();
    }
    console.log("JWT: Validated User")
    return user
  }
}
