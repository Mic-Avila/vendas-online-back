import { Body, Controller, Get, Param, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { CreateUserDto } from './dtos/createUser.dto';
import { UserService } from './user.service';
import { UserEntity } from './entities/user.entity';
import { ReturnUserDto } from './dtos/returnUser.dto';

@Controller('user')
export class UserController {

    constructor(private userService: UserService){}

    @UsePipes(ValidationPipe)
    @Post()
    async createUser(@Body() createUser: CreateUserDto):Promise<UserEntity>{
        return this.userService.createUser(createUser)
    }

    @Get()
    async getAllUsers(): Promise<ReturnUserDto[]>{
        return ( await this.userService.findAllUsers()).map(
            (userentity) => new ReturnUserDto(userentity)
        ) 
    }

    @Get('/:userId')
    async getUserById(@Param('userId') userId: number): Promise<ReturnUserDto>{
        return new ReturnUserDto( await this.userService.getUserByUsingRelations(userId))
    }

}
