export interface Grupo {
  id: number;
  nome: string;
}

export interface Produto {
  id: number;
  nome: string;
  idGrupo: number;
  precoVenda: number;
  quantidadeEstoque: number;
}

export type ProdutoPayload = Omit<Produto, 'id'> & { id?: number };

export interface VendaItem {
  idProduto: number;
  nomeProduto: string;
  quantidadeVendida: number;
  valorProduto: number;
}

export interface Venda {
  idPedido: number;
  data: string;
  totalItensPedido: number;
  valorTotalPedido: number;
  itens: VendaItem[];
}
