import { Body, Controller, Post, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignUpDto } from './dto/signup.dto';

@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('sign-up')
  signUp(token: string, @Body() dto: SignUpDto) {
    if (token === null) {
      throw new UnauthorizedException('Enter token');
    }

    return this.authService.signUp(token, dto);
  }
}
