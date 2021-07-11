import { Controller, Post, Request } from '@nestjs/common'
import { AuthService } from './auth/auth.service'

@Controller()
export class AppController{
  constructor(private readonly authService: AuthService) {}

  // I don't think I should be guarding here? right?
  // @UseGuards(GqlAuthGuard)
  @Post('auth/login')
  async login(@Request() req: any) {
    console.log(req.body)
    return this.authService.login(req.body)
  }
}
