import { Injectable, NotFoundException } from '@nestjs/common';
import { UserEntity } from 'src/user/entities/user.entity';
import { LoginDto } from './dtos/login.dto';
import { UserService } from 'src/user/user.service';
import * as bcrypt from 'bcrypt';
import { ReturnLogin } from './dtos/returnLogin.dto';
import { ReturnUserDto } from 'src/user/dtos/returnUser.dto';
import { LoginPayload } from './dtos/loginPayload.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {

    constructor(
        private readonly userService: UserService,
        private readonly jwtService: JwtService
    ){}

    async login(login: LoginDto): Promise <ReturnLogin>{
        const user: UserEntity | undefined = await this.userService.findUserByEmail(login.email).catch(()=> undefined)

        const isMatch = await bcrypt.compare(login.password, user?.password || "");

        if (!user || !isMatch) {
            throw new NotFoundException(`Email: ${login.email} ou senha não encontrados`);
          }
        return {
            acessToken: this.jwtService.sign({ ...new LoginPayload(user) }),
            user: new ReturnUserDto(user)}
    }
    
}
