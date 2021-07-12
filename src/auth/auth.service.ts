import { Injectable } from "@nestjs/common";
// import { UserService } from "@users/user.service";
import { JwtService } from "@nestjs/jwt";
import { AuthLoginInput, AuthUser } from "@models/auth.model";
import { PrismaService } from "@services/prisma.service";

@Injectable()
export class AuthService {
  constructor(
    // private userService: UserService,
    private jwtService: JwtService,
    private prisma: PrismaService
  ) {}


  // Validate
  // DESC: Validates the JWT_TOKEN.ID corresponds to existing user
  // INPUT: jwtId:number
  // RETURNS: boolean
  async validateJwtId(jwtId: number): Promise<Boolean>{
    const user = await this.prisma.user.findUnique({where:{id: jwtId}});
    return user ? true: false

  }


  // Private Find By Username
  // Returns: AuthUser (type User + {password:string})
  // TODO: Error Handling
  private async authFindByUsername(username: string): Promise<AuthUser | null>{
    return this.prisma.user.findUnique({where: {username}})
  }


  // Login
  // Args: Input = {username: string, password: string}
  // Returns: {access_token: JWT_TOKEN}
  async login(input: AuthLoginInput) {
    const { username, password } = input;
    const user = await this.authFindByUsername(username);
    if (user && username == user.username && password == user.password) {
      let token = this.jwtService.sign({ sub: user.id });
      console.log("JWT: Assigning Token = " + token);
      return { access_token: token };
    }
    return null;
  }
}
