import { Body, Controller, Get, Post } from '@nestjs/common';
import { CreateUserDto } from './dtos/createUser.dto';
import { UserService } from './user.service';
import { UserEntity } from './entities/user.entity';

@Controller('user')
export class UserController {

    constructor(private userService: UserService){}

    @Post()
    async createUser(@Body() createUser: CreateUserDto):Promise<UserEntity>{
        return this.userService.createUser(createUser)
    }

    @Get()
    async getAllUsers(): Promise<UserEntity[]>{
        return this.userService.findAllUsers()
    }

}