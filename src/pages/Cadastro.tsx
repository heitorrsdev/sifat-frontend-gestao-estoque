import { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { toast } from 'react-toastify';
import { useEstoque } from '../hooks/useEstoque';
import type { ProdutoPayload } from '../types';

const produtoSchema = z.object({
  nome: z.string().min(1, 'O nome do produto é obrigatório.'),
  idGrupo: z.number({ message: 'Selecione um grupo válido.' }).min(1, 'Selecione um grupo válido.'),
  precoVenda: z.number({ message: 'Preço inválido.' }).positive('O preço deve ser maior que zero.'),
  quantidadeEstoque: z.number({ message: 'Quantidade inválida.' }).min(0, 'A quantidade não pode ser negativa.'),
});

type ProdutoFormData = z.infer<typeof produtoSchema>;

export function Cadastro() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const isEditMode = Boolean(id);
  
  const { grupos, produtos, createProduto, updateProduto, isLoading } = useEstoque();

const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ProdutoFormData>({
    resolver: zodResolver(produtoSchema),
    defaultValues: {
      nome: '',
      idGrupo: 0,
      precoVenda: 0,
      quantidadeEstoque: 0,
    },
  });

  useEffect(() => {
    if (isEditMode && produtos.length > 0) {
      const produtoExistente = produtos.find((p) => p.id === Number(id));
      if (produtoExistente) {
        reset({
          nome: produtoExistente.nome,
          idGrupo: produtoExistente.idGrupo,
          precoVenda: produtoExistente.precoVenda,
          quantidadeEstoque: produtoExistente.quantidadeEstoque,
        });
      } else {
        toast.error('Produto não encontrado para edição.');
        void navigate('/');
      }
    }
  }, [id, isEditMode, produtos, reset, navigate]);

  const onSubmit = async (data: ProdutoFormData) => {
    try {
      const payload: ProdutoPayload = {
        nome: data.nome,
        idGrupo: data.idGrupo,
        precoVenda: data.precoVenda,
        quantidadeEstoque: data.quantidadeEstoque,
      };

      if (isEditMode) {
        await updateProduto(Number(id), payload);
        void navigate('/');
      } else {
        await createProduto(payload);
        reset();
      }
    } catch {
      // Os erros da API já disparam Toasts no Contexto, não é preciso duplicar aqui
    }
  };

  const onInvalid = () => {
    // Requisito: Toast de erro ao tentar gravar vazio/inválido
    toast.error('Preencha os campos obrigatórios corretamente.');
  };

  if (isLoading) {
    return <div className="text-gray-500 p-8">Carregando formulário...</div>;
  }

  return (
    <div className="max-w-2xl mx-auto space-y-6 animate-in fade-in duration-500">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">
          {isEditMode ? 'Editar Produto' : 'Cadastrar Novo Produto'}
        </h1>
        <p className="text-gray-600 mt-1">
          {isEditMode
            ? 'Altere as informações do produto selecionado.'
            : 'Preencha os dados abaixo para inserir um item no estoque.'}
        </p>
      </div>

      <form
        onSubmit={(e) => void handleSubmit(onSubmit, onInvalid)(e)}
        className="bg-white shadow-sm rounded-lg border border-gray-200 p-6 space-y-6"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          
          {/* Campo Nome */}
          <div className="col-span-1 md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Nome do Produto <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              {...register('nome', { valueAsNumber: true })}
              className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors ${
                errors.nome ? 'border-red-500 bg-red-50' : 'border-gray-300'
              }`}
              placeholder="Ex: Teclado Mecânico"
            />
            {errors.nome && <span className="text-red-500 text-xs mt-1 block">{errors.nome.message}</span>}
          </div>

          {/* Campo Grupo (Select) */}
          <div className="col-span-1">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Grupo <span className="text-red-500">*</span>
            </label>
            <select
              {...register('idGrupo', { valueAsNumber: true })}
              className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors ${
                errors.idGrupo ? 'border-red-500 bg-red-50' : 'border-gray-300'
              }`}
            >
              <option value={0} disabled>
                Selecione um grupo
              </option>
              {grupos.map((grupo) => (
                <option key={grupo.id} value={grupo.id}>
                  {grupo.nome}
                </option>
              ))}
            </select>
            {errors.idGrupo && <span className="text-red-500 text-xs mt-1 block">{errors.idGrupo.message}</span>}
          </div>

          {/* Campo Preço de Venda */}
          <div className="col-span-1">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Preço de Venda (R$) <span className="text-red-500">*</span>
            </label>
            <input
              type="number"
              step="0.01"
              {...register('precoVenda', { valueAsNumber: true })}
              className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors ${
                errors.precoVenda ? 'border-red-500 bg-red-50' : 'border-gray-300'
              }`}
              placeholder="0.00"
            />
            {errors.precoVenda && <span className="text-red-500 text-xs mt-1 block">{errors.precoVenda.message}</span>}
          </div>

          {/* Campo Quantidade em Estoque */}
          <div className="col-span-1">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Quantidade em Estoque
            </label>
            <input
              type="number"
              {...register('quantidadeEstoque', { valueAsNumber: true })}
              className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors ${
                errors.quantidadeEstoque ? 'border-red-500 bg-red-50' : 'border-gray-300'
              }`}
              placeholder="0"
            />
            {errors.quantidadeEstoque && (
              <span className="text-red-500 text-xs mt-1 block">{errors.quantidadeEstoque.message}</span>
            )}
          </div>
        </div>

        {/* Rodapé do Formulário (Ações) */}
        <div className="pt-4 border-t border-gray-100 flex items-center justify-end gap-3">
          <button
            type="button"
            onClick={() => void navigate(-1)} // Volta para a tela anterior
            className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
          >
            Cancelar
          </button>
          <button
            type="submit"
            disabled={isSubmitting}
            className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 disabled:opacity-50 transition-colors"
          >
            {isSubmitting ? 'Salvando...' : isEditMode ? 'Salvar Alterações' : 'Cadastrar Produto'}
          </button>
        </div>
      </form>
    </div>
  );
}
