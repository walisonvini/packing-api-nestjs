import { Injectable } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { BOXES } from './boxes';

@Injectable()
export class PackingService {
  private getVolume(dim: { altura: number; largura: number; comprimento: number }): number {
    return dim.altura * dim.largura * dim.comprimento;
  }

  private findBoxForProduct(product: { altura: number; largura: number; comprimento: number }) {
    return BOXES.find(
      (box) =>
        product.altura <= box.height &&
        product.largura <= box.width &&
        product.comprimento <= box.length,
    );
  }

  private boxHasSpace(
    box: { height: number; width: number; length: number },
    products: { altura: number; largura: number; comprimento: number }[],
    newProduct: { altura: number; largura: number; comprimento: number },
  ): boolean {
    const boxVolume = box.height * box.width * box.length;
    const usedVolume = products.reduce((sum, p) => sum + this.getVolume(p), 0);
    const newProductVolume = this.getVolume(newProduct);

    return usedVolume + newProductVolume <= boxVolume;
  }

  pack(createOrderDto: CreateOrderDto) {
    const result: { pedidos: { pedido_id: number; caixas: any[] }[] } = { pedidos: [] };

    for (const order of createOrderDto.pedidos) {
      const caixas: any[] = [];

      for (const product of order.produtos) {
        let placed = false;

        for (const caixa of caixas) {
          const box = BOXES.find((b) => `Caixa ${b.id}` === caixa.caixa_id);

          if (box && this.boxHasSpace(box, caixa.produtosDim, product.dimensoes)) {
            caixa.produtos.push(product.produto_id);
            caixa.produtosDim.push(product.dimensoes);
            placed = true;
            break;
          }
        }

        if (!placed) {
          const box = this.findBoxForProduct(product.dimensoes);

          if (box) {
            caixas.push({
              caixa_id: `Caixa ${box.id}`,
              produtos: [product.produto_id],
              produtosDim: [product.dimensoes],
            });
          } else {
            caixas.push({
              caixa_id: null,
              produtos: [product.produto_id],
              observacao: 'Produto não cabe em nenhuma caixa disponível.',
              produtosDim: [product.dimensoes],
            });
          }
        }
      }

      result.pedidos.push({
        pedido_id: order.pedido_id,
        caixas: caixas.map((c) => ({
          caixa_id: c.caixa_id,
          produtos: c.produtos,
          ...(c.observacao ? { observacao: c.observacao } : {}),
        })),
      });
    }

    return result;
  }
}
