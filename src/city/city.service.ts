import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CityEntity } from './entities/city.entity';
import { Repository } from 'typeorm';
import { CACHE_MANAGER, Cache } from '@nestjs/cache-manager';




@Injectable()
export class CityService {

    constructor(
        @InjectRepository(CityEntity)
        private readonly cityRepository: Repository<CityEntity>,
        @Inject(CACHE_MANAGER) private cacheManager: Cache){}


        async getAllCitysByState(stateId: number): Promise<CityEntity[]>{
            const cachedCities: CityEntity[] = await this.cacheManager.get(`state_${stateId}`);
            if (cachedCities) {
                return cachedCities;
            }
        
            const cities = await this.cityRepository.find({
                where: {
                    stateId
                }
            });
        
            await this.cacheManager.set(`state_${stateId}`, cities ); 
        
            return cities;
        }
        
    
}