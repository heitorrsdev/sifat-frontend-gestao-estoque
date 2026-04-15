import { NavLink } from 'react-router-dom';
import { Package, ReceiptText, PlusCircle } from 'lucide-react';

export default function Header() {
  return (
    <header className="fixed top-0 left-0 right-0 h-16 bg-white border-b border-gray-200 shadow-sm z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
            <Package className="w-5 h-5 text-white" />
          </div>
          <span className="font-bold text-xl tracking-tight text-gray-900">Sifat</span>
        </div>

        <nav className="hidden md:flex space-x-8">
          <NavLink
            to="/"
            className={({ isActive }) =>
              `flex items-center gap-2 text-sm font-medium transition-colors ${
                isActive ? 'text-blue-600' : 'text-gray-600 hover:text-blue-600'
              }`
            }
          >
            <Package className="w-4 h-4" />
            Produtos Cadastrados
          </NavLink>
          <NavLink
            to="/faturamento"
            className={({ isActive }) =>
              `flex items-center gap-2 text-sm font-medium transition-colors ${
                isActive ? 'text-blue-600' : 'text-gray-600 hover:text-blue-600'
              }`
            }
          >
            <ReceiptText className="w-4 h-4" />
            Faturamento
          </NavLink>
          <NavLink
            to="/cadastro"
            className={({ isActive }) =>
              `flex items-center gap-2 text-sm font-medium transition-colors ${
                isActive ? 'text-blue-600' : 'text-gray-600 hover:text-blue-600'
              }`
            }
          >
            <PlusCircle className="w-4 h-4" />
            Cadastrar Produto
          </NavLink>
        </nav>
      </div>
    </header>
  );
}
