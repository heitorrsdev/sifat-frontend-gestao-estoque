import { useCallback, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { Pencil, Trash2 } from 'lucide-react';
import { useEstoque } from '../hooks/useEstoque';
import { DataTable, type Column } from '../components/DataTable';
import type { Produto } from '../types';

type ProdutoEnriquecido = Produto & { nomeGrupo: string };

export function Produtos() {
  const { produtos, grupos, deleteProduto, isLoading } = useEstoque();
  const navigate = useNavigate();

  const produtosEnriquecidos = useMemo<ProdutoEnriquecido[]>(() => {
    return produtos.map((produto) => {
      const grupoCorreto = grupos.find((g) => g.id === produto.idGrupo);
      return {
        ...produto,
        nomeGrupo: grupoCorreto ? grupoCorreto.nome : 'Sem Grupo',
      };
    });
  }, [produtos, grupos]);

  const handleDelete = async (id: number) => {
    if (window.confirm('Atenção: Tem certeza que deseja excluir este produto do estoque?')) {
      await deleteProduto(id);
    }
  };

  const columns: Column<ProdutoEnriquecido>[] = [
    { header: 'ID', accessor: 'id' },
    { header: 'Nome', accessor: 'nome' },
    { header: 'Grupo', accessor: 'nomeGrupo' },
    { header: 'Estoque', accessor: 'quantidadeEstoque' },
    {
      header: 'Preço Unitário',
      accessor: 'precoVenda',
      render: (item) =>
        new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(item.precoVenda),
    },
    {
      header: 'Ações',
      accessor: 'acoes',
      sortable: false,
      render: (item) => (
        <div className="flex gap-4 items-center">
          <button
            onClick={() => void navigate(`/editar/${String(item.id)}`)}
            className="text-blue-600 hover:text-blue-800 transition-colors"
            title="Editar Produto"
          >
            <Pencil className="cursor-pointer w-4 h-4" />
          </button>
          <button
            onClick={() => void handleDelete(item.id)}
            className="text-red-600 hover:text-red-800 transition-colors"
            title="Excluir Produto"
          >
            <Trash2 className="cursor-pointer w-4 h-4" />
          </button>
        </div>
      ),
    },
  ];

  const filterFn = useCallback((item: ProdutoEnriquecido, search: string) => {
    const term = search.toLowerCase();
    return (
      item.nome.toLowerCase().includes(term) ||
      item.nomeGrupo.toLowerCase().includes(term)
    );
  }, []);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64 text-gray-500">
        Carregando base de dados da Sifat...
      </div>
    );
  }

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Estoque de Produtos</h1>
        <p className="text-gray-600 mt-1">Gerencie os itens cadastrados no sistema.</p>
      </div>

      <DataTable
        data={produtosEnriquecidos}
        columns={columns}
        globalFilterFn={filterFn}
        filterPlaceholder="Buscar por Nome do Produto ou Grupo..."
      />
    </div>
  );
}
