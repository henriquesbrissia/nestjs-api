import { ConflictException, Injectable } from '@nestjs/common';
import { UserDto } from './user.dto';
import { v4 as uuid } from 'uuid'
import { hashSync } from 'bcrypt';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/db/entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {

  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>
  ) {}

  async create(newUser: UserDto) {
    const userAlreadyRegistered = await this.findByEmail(newUser.email)
    
    if (userAlreadyRegistered) {
      throw new ConflictException(`User ${newUser.email} already registered`)
    }

    const dbUser = new User()
    dbUser.email = newUser.email
    dbUser.password = hashSync(newUser.password, 10)

    const { id, email } = await this.usersRepository.save(dbUser)

    return { id, email }
  }

  async findByEmail(email: string): Promise<UserDto | null> {
    const userFound = await this.usersRepository.findOne({
      where: { email }
    })

    if (!userFound) {
      return null
    }

    return {
      id: userFound.id,
      email: userFound.email,
      password: userFound.password
    }
  }
}
