import { NavLink } from 'react-router-dom';
import { Package, ReceiptText, PlusCircle } from 'lucide-react';

export default function Header() {
  return (
    <header className="fixed top-0 left-0 right-0 h-16 bg-white border-b border-gray-200 shadow-sm z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center justify-between">
        
        <NavLink
          to="/"
          className="flex items-center gap-2 text-sm font-medium transition-colors"
        >
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
              <Package className="w-5 h-5 text-white" />
            </div>
            <span className="font-bold text-xl tracking-tight text-gray-900">Sifat</span>
          </div>
        </NavLink>

        <nav className="flex items-center gap-6 md:gap-8">
          <NavLink
            to="/"
            title="Produtos Cadastrados"
            className={({ isActive }) =>
              `flex items-center gap-2 text-sm font-medium transition-colors ${
                isActive ? 'text-blue-600' : 'text-gray-600 hover:text-blue-600'
              }`
            }
          >
            <Package className="w-5 h-5 md:w-4 md:h-4" />
            <span className="hidden md:block">Produtos Cadastrados</span>
          </NavLink>

          <NavLink
            to="/faturamento"
            title="Faturamento"
            className={({ isActive }) =>
              `flex items-center gap-2 text-sm font-medium transition-colors ${
                isActive ? 'text-blue-600' : 'text-gray-600 hover:text-blue-600'
              }`
            }
          >
            <ReceiptText className="w-5 h-5 md:w-4 md:h-4" />
            <span className="hidden md:block">Faturamento</span>
          </NavLink>

          <NavLink
            to="/cadastro"
            title="Cadastrar Produto"
            className={({ isActive }) =>
              `flex items-center gap-2 text-sm font-medium transition-colors ${
                isActive ? 'text-blue-600' : 'text-gray-600 hover:text-blue-600'
              }`
            }
          >
            <PlusCircle className="w-5 h-5 md:w-4 md:h-4" />
            <span className="hidden md:block">Cadastrar Produto</span>
          </NavLink>
        </nav>

      </div>
    </header>
  );
}
