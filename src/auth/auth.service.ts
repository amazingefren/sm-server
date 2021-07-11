import { Injectable } from '@nestjs/common';
import { UserService } from '@global/users/user.service'
import { User, UserUniqueInput } from '@global/users/user.model';
import { JwtService } from '@nestjs/jwt'

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService
  ){}

  async validateUser(username: UserUniqueInput): Promise<User|null> {
    const user = await this.userService.findOneByUsername(username)
    if (user && user.username == "efren") {
      const { ...result } = user;
      console.log(result)
      return result
    }
    return null
  }

  async login(user:User){
    
    // const payload = this.validateUser(user.username) 
    // this.validateUser(user)
    // TODO WORK ON THIS
    // const test = await this.userService.findOneByUsername({username: user.username})

    // const user = await this.userService.findOneByUsername(user.username)

    // console.log(this.validateUser(user))

    const payload = {username: user.username, sub: user.id}

    return {
      access_token: this.jwtService.sign(payload)
    }
  }
}
