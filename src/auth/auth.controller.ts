import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthResponseDto, SignInDto } from './auth.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @HttpCode(HttpStatus.OK)
  @Post('signin')
  async SignIn(
    @Body() signInDto: SignInDto) {
    return this.authService.signIn(signInDto.email, signInDto.password)
  }
}
