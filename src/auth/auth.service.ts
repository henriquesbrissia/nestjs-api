import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';
import { AuthResponseDto } from './auth.dto';
import { ConfigService } from '@nestjs/config';
import { compareSync } from 'bcrypt';

@Injectable()
export class AuthService {
  private jwtExpiration: number

  constructor(
    private readonly userService: UsersService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService
  ) {
    this.jwtExpiration = Number(this.configService.get<number>('JWT_EXPIRATION_TIME'))
  }

  async signIn(email: string, password: string): Promise<AuthResponseDto> {
    const foundUser = await this.userService.findOne(email)

    if (!foundUser || !compareSync(password, foundUser.password)) {
      throw new UnauthorizedException();
    }

    const payload = { sub: foundUser.id, email: foundUser.email }

    const token = this.jwtService.sign(payload)

    return {token, expiresIn: this.jwtExpiration}
  }
}
