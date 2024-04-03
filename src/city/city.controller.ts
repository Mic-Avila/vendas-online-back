import { Controller, Get, Param } from '@nestjs/common';
import { CityService } from './city.service';
import { CityEntity } from './entities/city.entity';

@Controller('city')
export class CityController {

    constructor(
        private cityService: CityService
    ) { }


    @Get('/:stateId')
    async getAllCitysByState(
        @Param('stateId') stateId: number): Promise<CityEntity[]> {
        return this.cityService.getAllCitysByState(stateId)
    }
}
