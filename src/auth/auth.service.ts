import { Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import {
  AuthLoginInput,
  AuthRegisterInput,
  AuthSafeUserLogin,
  AuthUser,
} from "@models/auth.model";
import { PrismaService } from "@services/prisma.service";
// import { User } from "@models/user.model";

@Injectable()
export class AuthService {
  constructor(private jwtService: JwtService, private prisma: PrismaService) {}

  // Validate
  // DESC: Validates the JWT_TOKEN.ID corresponds to existing user
  // INPUT: jwtId:number
  // RETURNS: boolean
  async validateJwtId(jwtId: number): Promise<boolean> {
    const user = await this.prisma.user.findUnique({ where: { id: jwtId } });
    return user ? true : false;
  }

  // Private Find By Username
  // Returns: AuthUser (type User + {password:string})
  // TODO: Error Handling
  private async authFindByUsername(username: string): Promise<AuthUser | null> {
    return this.prisma.user.findUnique({ where: { username } });
  }

  // Login
  // Args: Input = {username: string, password: string}
  // Returns: {typeof User + access_token: JWT_TOKEN}
  async login(input: AuthLoginInput): Promise<AuthSafeUserLogin | null> {
    const { username, password } = input;
    const user = await this.authFindByUsername(username);
    if (user && username == user.username && password == user.password) {
      let token = this.jwtService.sign({ sub: user.id });
      console.log("JWT: Assigning Token = " + token);
      let { password, ...payload } = {
        access_token: "Bearer " + token,
        ...user,
      };
      return payload;
    }
    return null;
  }

  // Register
  async register(input: AuthRegisterInput): Promise<boolean> {
    try {
      const user = await this.prisma.user.create({
        data: { username: input.username, password: input.password },
      });
      return user ? true : false;
    } catch (err) {
      return false;
    }
  }
}
