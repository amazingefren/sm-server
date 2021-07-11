import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { AuthService } from "./auth.service";
import { jwtConstants } from "./constants";
import { JwtDTO } from "./dto/jwt.dto";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy){
  constructor(private authService: AuthService){
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: jwtConstants.secret
    })
  }
  async validate(input: JwtDTO): Promise<any>{
    const user = await this.authService.validateUser(input.sub);
    if (!user){
      throw new UnauthorizedException();
    }
    return user
  }
}
