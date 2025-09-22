export class CaixaDto {
  caixa_id: string | null;
  produtos: string[];
  observacao?: string;
}

export class PedidoResultadoDto {
  pedido_id: number;
  caixas: CaixaDto[];
}

export class PackingResultDto {
  pedidos: PedidoResultadoDto[];
}
