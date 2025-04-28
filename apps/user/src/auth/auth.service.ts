import { Injectable } from '@nestjs/common';
import { SignUpDto } from './dto/signup.dto';

@Injectable()
export class AuthService {
  constructor() {}

  signUp(token: string, dto: SignUpDto) {}
}
