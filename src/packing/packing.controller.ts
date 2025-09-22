import { Controller, Post, Body, HttpCode } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { PackingService } from './packing.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { PackingResultDto } from './dto/packing-result.dto';

@ApiTags('Packing')
@Controller('packing')
export class PackingController {
  constructor(private readonly packingService: PackingService) {}

  @Post()
  @HttpCode(200)
  @ApiOperation({ summary: 'Empacota os pedidos recebidos' })
  @ApiResponse({ status: 201, description: 'Pedidos empacotados com sucesso.' })
  pack(@Body() dto: CreateOrderDto): PackingResultDto {
    return this.packingService.pack(dto);
  }
}
