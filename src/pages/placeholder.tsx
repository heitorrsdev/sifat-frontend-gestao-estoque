import { DataTable, type Column } from '../components/DataTable';

// 1. Tipagem temporária para o teste
interface TestProduto {
  id: number;
  nome: string;
  preco: number;
}

// 2. Dados falsos para forçar a paginação
const mockData: TestProduto[] = Array.from({ length: 25 }).map((_, i) => ({
  id: i + 1,
  nome: `Produto de Teste ${String(i + 1)}`, // Correção: Conversão explícita para string
  preco: Math.random() * 1000,
}));

// 3. Definição das colunas
const columns: Column<TestProduto>[] = [
  { header: 'ID', accessor: 'id' },
  { header: 'Nome do Produto', accessor: 'nome' },
  {
    header: 'Preço',
    accessor: 'preco',
    render: (item) => 
      new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(item.preco),
  },
];

export default function Placeholder() {
  return (
    <div className="p-8 max-w-6xl mx-auto bg-gray-100 min-h-screen">
      <h1 className="text-2xl font-bold mb-6 text-gray-800">Sandbox de Teste: DataTable</h1>
      
      <DataTable
        data={mockData}
        columns={columns}
        itemsPerPage={5}
        globalFilterFn={(item: TestProduto, search: string) => {
          const matchNome = item.nome.toLowerCase().includes(search.toLowerCase());
          const matchId = String(item.id).includes(search);
          return matchNome || matchId;
        }}
      />
    </div>
  );
}
