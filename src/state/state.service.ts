import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { StateEntity } from './entities/state.entity';
import { Repository } from 'typeorm';
import { UserEntity } from 'src/user/entities/user.entity';

@Injectable()
export class StateService {

    constructor(
        @InjectRepository(StateEntity)
        private readonly stateService:Repository<UserEntity>){}

    async getAllState(): Promise<StateEntity[]>{
        return this.stateService.find()
    }
}
