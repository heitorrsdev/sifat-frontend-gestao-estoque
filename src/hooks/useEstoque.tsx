import { useContext } from 'react'
import EstoqueContext from '../contexts/EstoqueContext';

export function useEstoque() {
  const context = useContext(EstoqueContext);

  if (!context) {
    throw new Error('useEstoque deve ser utilizado dentro de um EstoqueProvider');
  }
  
  return context;
}
