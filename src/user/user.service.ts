import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dtos/createUser.dto';
import { UserEntity } from './entities/user.entity';
import * as bcrypt from 'bcrypt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  async createUser(createUser: CreateUserDto): Promise<UserEntity> {
    const saltOrRounds = 10;
    const passwordHashed = await bcrypt.hash(createUser.password, saltOrRounds);

    return this.userRepository.save({
      ...createUser,
      typeUser: 1,
      password: passwordHashed,
    });
  }

  async findAllUsers(): Promise<UserEntity[]> {
    return this.userRepository.find();
  }

  async findUserById(userId: number): Promise<UserEntity> {
    const user = await this.userRepository.findOne({
      where: {
        id: userId,
      },
    });
    if (!user) {
      throw new NotFoundException(`Usuario ${userId} não encontrado`);
    }

    return user;
  }

  async getUserByUsingRelations(userId: number): Promise<UserEntity> {
    return await this.userRepository.findOne({
      where: {
        id: userId,
      },
      relations: {
        addresses: {
          city: {
            state: true,
          },
        },
      },
    });
  }


  async findUserByEmail(email: string): Promise<UserEntity> {
    const user = await this.userRepository.findOne({
      where: {
        email: email,
      },
    });
    if (!user) {
      throw new NotFoundException(`Email: ${email} não encontrado`);
    }

    return user;
  }

}
