export class CreateUserDto {
  email: string;
  password: string;
}

export class FindOneUserDto {
  id?: string
  email?: string
}