import { CacheService } from './../cache/cache.service';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CityEntity } from './entities/city.entity';
import { Repository } from 'typeorm';





@Injectable()
export class CityService {

    constructor(
        @InjectRepository(CityEntity)
        private readonly cityRepository: Repository<CityEntity>,
        private readonly cacheService: CacheService) { }



    async getAllCitysByState(stateId: number): Promise<CityEntity[]> {
        return this.cacheService.getCache<CityEntity[]>(`stateId_${stateId}`,
            () => this.cityRepository.find({
                where: {
                    stateId,
                }
            }),
        )
    }


}
