import { Module } from '@nestjs/common';
import { CityController } from './city.controller';
import { CityService } from './city.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CityEntity } from './entities/city.entity';
import { CacheModule as CacheModuleSERVICECASH } from 'src/cache/cache.module';




@Module({
  imports:[
    TypeOrmModule.forFeature([CityEntity]), 
    CacheModuleSERVICECASH],

  controllers: [CityController],
  providers: [CityService]
})
export class CityModule {}
