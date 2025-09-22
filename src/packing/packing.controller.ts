import { Controller, Post, Body, HttpCode } from '@nestjs/common';
import { PackingService } from './packing.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { PackingResultDto } from './dto/packing-result.dto';

@Controller('packing')
export class PackingController {
  constructor(private readonly packingService: PackingService) {}

  @Post()
  @HttpCode(200)
  pack(@Body() dto: CreateOrderDto): PackingResultDto {
    return this.packingService.pack(dto);
  }
}
