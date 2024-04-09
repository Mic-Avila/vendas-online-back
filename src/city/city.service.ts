import { CacheService } from './../cache/cache.service';
import { BadRequestException, Injectable } from '@nestjs/common';
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

    async findCityById(cityId):Promise<CityEntity>{
        const city = await this.cityRepository.findOne({
            where: {
                id: cityId
            }
        })
        if(!city){
            throw new BadRequestException(`Cidade ${cityId} não encontrada!`)
        }

        return city
    }


}
