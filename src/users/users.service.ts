import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto, FindOneUserDto } from './user.dto';
import { hash } from 'bcrypt';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/db/entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {

  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>
  ) {}

  async create(createUserDto: CreateUserDto) {
    const userAlreadyRegistered = await this.findOne({ email: createUserDto.email });

    if (userAlreadyRegistered) {
      throw new ConflictException(`User ${createUserDto.email} already registered`);
    }

    const dbUser = new User();
    dbUser.email = createUserDto.email;
    dbUser.password = await hash(createUserDto.password, 10);

    const { id, email } = await this.usersRepository.save(dbUser);

    return { id, email };
  }

  async findOne(findOneUserDto: FindOneUserDto) {
    const userFound = await this.usersRepository.findOne({ where: findOneUserDto });

    if (!userFound) {
      throw new NotFoundException('User not found');
    }

    return userFound;
  }
}
