import { BadRequestException, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcryptjs';
import { Repository } from 'typeorm';
import { User } from '../user/entity/user.entity';
import { UserService } from '../user/user.service';
import { SignUpDto } from './dto/signup.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly configService: ConfigService,
    private readonly jwtService: JwtService,
  ) {}

  signUp(rawToken: string, dto: SignUpDto) {
    const { email, password } = this.parseBasicToken(rawToken);

    return this.userService.create({ email, password, ...dto });
  }

  async signIn(rawToken: string) {
    const { email, password } = this.parseBasicToken(rawToken);

    const user = await this.authentication(email, password);

    return {
      refreshToken: await this.issueToken(user, true),
      accessToken: await this.issueToken(user, false),
    };
  }

  parseBasicToken(rawToken: string) {
    const basicSpilt = rawToken.split(' ');

    if (basicSpilt.length !== 2) {
      throw new Error('Invalid token');
    }

    const [basicType, token] = basicSpilt;

    if (basicType.toLowerCase() !== 'basic') {
      throw new Error('Invalid token');
    }

    const decodedToken = Buffer.from(token, 'base64').toString('utf-8');

    const tokenSpilt = decodedToken.split(':');

    if (tokenSpilt.length !== 2) {
      throw new Error('Invalid token');
    }

    const [email, password] = tokenSpilt;

    return { email, password };
  }

  async authentication(email: string, password: string) {
    const user = await this.userRepository.findOne({
      where: { email },
      select: ['id', 'email', 'password'],
    });

    if (!user) {
      throw new BadRequestException('User not found');
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      throw new BadRequestException('Invalid password');
    }

    return user;
  }

  async issueToken(user: any, isRefreshToken: boolean) {
    const refreshTokenSecret = this.configService.getOrThrow<string>(
      'REFRESH_TOKEN_SECRET',
    );
    const accessTokenSecret = this.configService.getOrThrow<string>(
      'ACCESS_TOKEN_SECRET',
    );

    return this.jwtService.signAsync(
      {
        sub: user.id ?? user.sub,
        role: user.role,
        type: isRefreshToken ? 'refresh' : 'access',
      },
      {
        secret: isRefreshToken ? refreshTokenSecret : accessTokenSecret,
        expiresIn: isRefreshToken ? '7d' : '1h',
      },
    );
  }
}
