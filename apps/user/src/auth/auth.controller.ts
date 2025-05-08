import {
  Body,
  Controller,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { Authorization } from './decorator/authorization.decorator';
import { SignUpDto } from './dto/signup.dto';

@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('sign-up')
  @UsePipes(ValidationPipe)
  signUp(@Authorization() token: string, @Body() dto: SignUpDto) {
    return this.authService.signUp(token, dto);
  }

  @Post('sign-in')
  @UsePipes(ValidationPipe)
  signIn(@Authorization() token: string) {
    return this.authService.signIn(token);
  }
}
