import { useEstoque } from '../hooks/useEstoque';
import { DataTable, type Column } from '../components/DataTable';
import type { Venda } from '../types';
import { useCallback } from 'react';

export function Faturamento() {
  const { vendas, isLoading } = useEstoque();

  const columns: Column<Venda>[] = [
    {
      header: 'Pedido #',
      accessor: 'idPedido',
      render: (item) => <span className="font-semibold text-gray-700">#{item.idPedido}</span>,
    },
    {
      header: 'Data da Venda',
      accessor: 'data',
      render: (item) => {
        const [ano, mes, dia] = item.data.split('-');
        return `${dia}/${mes}/${ano}`;
      },
    },
    {
      header: 'Produtos Comprados',
      accessor: 'itens',
      sortable: false,
      render: (item) => {
        const resumo = item.itens
          .map((i) => `${String(i.quantidadeVendida)}x ${i.nomeProduto}`)
          .join(', ');
        
        return (
          <span className="text-gray-600 text-sm truncate block max-w-xs" title={resumo}>
            {resumo}
          </span>
        );
      },
    },
    { header: 'Total de Itens', accessor: 'totalItensPedido' },
    {
      header: 'Valor Total',
      accessor: 'valorTotalPedido',
      render: (item) =>
        new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(item.valorTotalPedido),
    },
  ];

  const filterFn = useCallback((item: Venda, search: string) => {
    return String(item.idPedido).includes(search);
  }, []);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64 text-gray-500">
        Carregando histórico de vendas...
      </div>
    );
  }

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Faturamento e Vendas</h1>
        <p className="text-gray-600 mt-1">Consulte o histórico de pedidos processados.</p>
      </div>

      <DataTable
        data={vendas}
        columns={columns}
        globalFilterFn={filterFn}
        filterPlaceholder="Buscar pelo número do pedido (ex: 104)..."
      />
    </div>
  );
}
