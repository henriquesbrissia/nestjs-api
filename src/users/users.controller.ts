import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './user.dto';
import { AuthGuard } from 'src/guards/auth.guard';

@UseGuards(AuthGuard)
@Controller('createUser')
export class UsersController {
  constructor(private readonly usersService: UsersService){}

  @Post()
  async create(@Body() createUser: CreateUserDto){
    return this.usersService.create(createUser)
  }
}
