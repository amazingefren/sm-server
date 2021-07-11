import { Injectable } from '@nestjs/common';
import { UserService } from '@global/users/user.service'
import { JwtService } from '@nestjs/jwt'
import { AuthLoginInput } from './auth.model';
import { User } from '@global/users/user.model';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService
  ){}

  async validateUser(input: number): Promise<User|null> {
    return this.userService.findOneById({id:input})
  }

  async login(input:AuthLoginInput){
    const {username, password} = input
    const user = await this.userService.findOneByUsername(username)
    if (user && username == user.username && password == user.password){
      return {access_token: this.jwtService.sign({sub: user.id})} 
    }
    return null
  }
}
