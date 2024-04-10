import {
    Body,
  Controller,
  Param,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { CreateAddressDto } from './dtos/createAddress.dto';
import { AddressService } from './address.service';
import { Roles } from 'src/decorator/roles.decorator';
import { UserType } from 'src/user/enum/user-type.enum';

@Controller('address')
export class AddressController {
  constructor(private addressService: AddressService) {}

  @Roles(UserType.User)
  @Post('/:userId')
  @UsePipes(ValidationPipe)
  async createAddress(
    @Body()createAddress: CreateAddressDto,
    @Param('userId') userId: number,
  ) {
    return this.addressService.createAddress(createAddress, userId);
  }
}
