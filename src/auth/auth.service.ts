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
import * as bcrypt from 'bcrypt'

const saltRounds = 12

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
    const user = await this.authFindByUsername(input.username);
    if (user && input.username == user.username) {
      const isValid = await bcrypt.compare(input.password, user.password)
      if (isValid) {
        let token = this.jwtService.sign({ sub: user.id });
        console.log("JWT: Assigning Token = " + token);
        let { password, ...payload } = {
          access_token: "Bearer " + token,
          ...user,
        };
        return payload;
      }
    }
    return null;
  }

  // Register
  async register(input: AuthRegisterInput): Promise<boolean> {
    try {
      const hash = await bcrypt.hash(input.password, saltRounds)
      const data = {username: input.username, password: hash}
      const user = await this.prisma.user.create({
        data,
      });
      return user ? true : false;
    } catch (err) {
      return false;
    }
  }
}
