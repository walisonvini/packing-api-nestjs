import { IsArray, ValidateNested, IsNumber, IsString } from 'class-validator';
import { Type } from 'class-transformer';

export class DimensoesDto {
  @IsNumber()
  altura: number;

  @IsNumber()
  largura: number;

  @IsNumber()
  comprimento: number;
}

export class ProdutoDto {
  @IsString()
  produto_id: string;

  @ValidateNested()
  @Type(() => DimensoesDto)
  dimensoes: DimensoesDto;
}

export class PedidoDto {
  @IsNumber()
  pedido_id: number;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ProdutoDto)
  produtos: ProdutoDto[];
}

export class CreateOrderDto {
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => PedidoDto)
  pedidos: PedidoDto[];
}
