import { createContext, useState, useEffect, useCallback, type ReactNode, useMemo } from 'react';
import { toast } from 'react-toastify';
import { api } from '../services/api';
import type { Produto, ProdutoPayload, Venda, Grupo } from '../types';
import { AxiosError } from 'axios';

interface EstoqueContextData {
  produtos: Produto[];
  vendas: Venda[];
  grupos: Grupo[];
  isLoading: boolean;
  createProduto: (payload: ProdutoPayload) => Promise<void>;
  updateProduto: (id: number, payload: ProdutoPayload) => Promise<void>;
  deleteProduto: (id: number) => Promise<void>;
}

const EstoqueContext = createContext<EstoqueContextData | undefined>(undefined);

export function EstoqueProvider({ children }: { children: ReactNode }) {
  const [produtos, setProdutos] = useState<Produto[]>([]);
  const [vendas, setVendas] = useState<Venda[]>([]);
  const [grupos, setGrupos] = useState<Grupo[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const [resProdutos, resVendas, resGrupos] = await Promise.all([
          api.get<Produto[]>('/produtos_cadastrados'),
          api.get<Venda[]>('/vendas'),
          api.get<Grupo[]>('/grupos'),
        ]);

        setProdutos(resProdutos.data);
        setVendas(resVendas.data);
        setGrupos(resGrupos.data);
      } catch {
        toast.error('Erro ao carregar dados do servidor.');
      } finally {
        setIsLoading(false);
      }
    };

    void fetchData();
  }, []);

  const createProduto = useCallback(async (payload: ProdutoPayload) => {
    try {
      await api.post('/produtos_cadastrados', payload);
      
      setProdutos((prev: Produto[]) => {
        const nextId = prev.length > 0 ? Math.max(...prev.map((p) => p.id)) + 1 : 1;
        return [...prev, { ...payload, id: nextId } as Produto];
      });

      toast.success('Produto cadastrado com sucesso!');
    } catch (error) {
      toast.error('Falha ao cadastrar o produto.');
      throw error;
    }
  }, []);

  const updateProduto = useCallback(async (id: number, payload: ProdutoPayload) => {
    try {
      await api.put(`/produtos_cadastrados/${String(id)}`, payload);
      
      setProdutos((prev) => prev.map((p) => p.id === id ? { ...payload, id } as Produto : p));
      toast.success('Produto atualizado com sucesso!');
      
    } catch (error: unknown) {
      if (error instanceof AxiosError && error.response?.status === 404) {
        setProdutos((prev) => prev.map((p) => p.id === id ? { ...payload, id } as Produto : p));
        toast.success('Produto atualizado (Mock local)');
      } else {
        toast.error('Erro ao atualizar o produto na API.');
      }
    }
  }, []);

  const deleteProduto = useCallback(async (id: number) => {
    try {
      await api.delete(`/produtos_cadastrados/${String(id)}`);
      
      setProdutos((prev) => prev.filter((produto) => produto.id !== id));
      
      toast.success('Produto excluído com sucesso!');
    } catch (error) {
      toast.error('Falha ao excluir o produto.');
      throw error;
    }
  }, []);

  const contextValue = useMemo(() => ({
    produtos,
    vendas,
    grupos,
    isLoading,
    createProduto,
    updateProduto,
    deleteProduto,
  }), [produtos, vendas, grupos, isLoading, createProduto, updateProduto, deleteProduto]);

  return (
    <EstoqueContext.Provider value={contextValue}>
      {children}
    </EstoqueContext.Provider>
  );
}

export default EstoqueContext;
