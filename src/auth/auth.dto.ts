export class AuthResponseDto {
  token: string
  expiresIn: number
}

export class SignInDto {
  email: string;
  password: string;
}
