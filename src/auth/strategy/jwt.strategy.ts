import { JwtDTO } from "@dto/jwt.dto";
import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { AuthService } from "../auth.service";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: true,
      secretOrKey: process.env.JWT_SECRET,
    });
  }
  // TODO: Error to Promise
  // RETURNS: <Boolean | Error>
  async validate(input: JwtDTO): Promise<JwtDTO> {
    const exists = await this.authService.validateJwtId(input.sub);
    if (!exists) {
      // TEST: Change JWT Payload to a NON_EXISTANT ID
      console.log("JWT_STRATEGY: NON_EXISTANT USER REQUESTED");
      throw new UnauthorizedException();
    }
    else {
      return input; 
    }
  }
}
